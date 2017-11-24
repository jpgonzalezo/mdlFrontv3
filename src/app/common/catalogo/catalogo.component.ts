import { Component, OnInit } from '@angular/core';
import {GeneroListService} from './service/generos-list.service';
import {Genero} from './model/genero.model';
import {LibroListService} from '../book-list/services/newBook-list.service';
import {Libro} from '../book-list/models/book.model';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  router: Router;

  generos: Array<Genero>;
  libros: Array<Libro>;
  constructor(private _generoListService: GeneroListService,private _libroListService: LibroListService, private _http:Http, router: Router) { this.router=router;}

  ngOnInit() {
    this.getAllBook();
    this._generoListService.getAll().subscribe(
      (data: Genero[])=>{this.generos=data;},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

  getAllBook(){

    this._libroListService.getAll().subscribe(
      (data: Libro[])=>{this.libros=data;},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

  searchGenero(genero: Genero){
    const url=`http://localhost:8000/libros/genero/${genero.id}`;
    console.log("click genero");
    const headers= new Headers({'Content-Type':'aplication/json'});
    const options= new RequestOptions({headers:headers});
    return this._http.get(url,options).map((response)=> {console.log(response); return response.json()}).subscribe(
    (data: Libro[])=>{this.libros=data;console.log(data);},
    err=>{console.error();},
    ()=>{console.log("filtro genero listo");}
    );
  }
  public goToBookDetail(id :number){
    this.router.navigate(['/detail',id]);
  }

}
