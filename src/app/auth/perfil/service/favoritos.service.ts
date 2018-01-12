import { Injectable } from '@angular/core';
import { Libro } from '../../../common/book-list/models/book.model';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class FavoritosService {

  Libros: Array<Libro> = [];
  constructor(private _http: Http) { }
  agregarFavorito(libro: Libro) {
    //POST

  }

  eliminarLibro(libro: Libro) {
    //DELETE

  }
}
