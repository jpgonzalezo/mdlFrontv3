import { Component, OnInit , OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dealer} from '../../common/dealer-destacados-list/model/dealer.model';
import {Editorial} from '../../common/editorial-list/model/editorial.model';
import {DealerListService} from '../../common/dealer-destacados-list/service/dealer-list.service';
import {EditorialListService} from '../../common/editorial-list/service/editorial-list.service';
import {Libro} from '../../common/book-list/models/book.model';



import{Injectable} from '@angular/core';
import{Http,RequestOptions,Headers} from '@angular/http';
import {Config} from '../../config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  id:number;
  idCatalogo:number;
  tipo: number;
  dealer: Dealer;
  editorial: Editorial;
  editoriales: Array<Editorial>;
  dealers: Array<Dealer>;
  private sub:any;
  constructor(private route: ActivatedRoute,
              private _editorialListService: EditorialListService,
              private _dealerListService: DealerListService,
              private _http: Http) { }

  public buscarEditorial(elemento:Editorial[]){
    if(this.tipo==1){
      elemento.forEach(element => {
        if(element.id==this.id){
          this.editorial=element;
        }   
      });
      console.log("editorial perfil");
      console.log(this.editorial)
    }
  }

  public buscarDealer(elemento:Dealer[]){
    if(this.tipo==0){
      elemento.forEach(element => {
        if(element.id==this.id){
          this.idCatalogo=this.id;
          this.dealer=element;
        }   
      });
      console.log("dealer perfil");
      console.log(this.dealer);
    }
  }

  public getCatalogo(){
        //AQUI VA URL DEL SERVICIO QUE ENTREGA LA LISTA DE LIBROS
        const url= Config.API_SERVER_URL_LIBROS;
        const headers= new Headers({'Content-Type':'aplication/json'});
        const options= new RequestOptions({headers:headers});
        return this._http.get(url,options).map((response)=> {console.log(response); return response.json()});
  }

  ngOnInit() {
    this.sub=this.route.params.subscribe(
      params=>{
        this.id=+params['id'];
        this.tipo=+params['tipo'];
      }
    );

    this._editorialListService.getAll().subscribe(
      (data: Editorial[])=>{this.editoriales=data;this.buscarEditorial(this.editoriales)},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );

    this._dealerListService.getAll().subscribe(
      (data: Dealer[])=>{this.dealers=data;this.buscarDealer(this.dealers)},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }




}
