import { Component, OnInit } from '@angular/core';
import {GeneroListService} from './service/generos-list.service';
import {Genero} from './model/genero.model';
import {LibroListService} from '../book-list/services/newBook-list.service';
import {Libro} from '../book-list/models/book.model';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import { CartService } from 'app/common/cart/services/cart.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AuthenticationService } from 'app/public/login/service/authentication.service';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  router: Router;
  logueado: boolean;
  generos: Array<Genero>;
  libros: Array<Libro>;
  constructor(private _generoListService: GeneroListService,
              private _libroListService: LibroListService,
              private _http: Http, router: Router,
              private _cartService: CartService,
              private _authService: AuthenticationService) { this.router = router; }

  ngOnInit() {
    this.getAllBook();
    this._generoListService.getAll().subscribe(
      (data: Genero[]) => {this.generos = data; },
      err => {console.error(); },
      () => {console.log('libros obtenidos exitosamente'); }
    );
    this.logueado = this._authService.logueado();
  }

  getAllBook() {

    this._libroListService.getAll().subscribe(
      (data: Libro[]) => {this.libros = data; },
      err => {console.error(); },
      () => {console.log('libros obtenidos exitosamente'); }
    );
  }

  searchGenero(genero: Genero) {
    const url = `http://localhost:8000/libros/genero/${genero.id}`;
    console.log('click genero');
    const headers = new Headers({'Content-Type': 'aplication/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.get(url, options).map((response) => {console.log(response); return response.json(); }).subscribe(
    (data: Libro[]) => {this.libros = data; console.log(data); },
    err => {console.error(); },
    () => {console.log('filtro genero listo'); }
    );
  }
  public goToBookDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  public addProductToCart(product: Libro): void {
    this._cartService.addItem(product, 1);
  }

}
