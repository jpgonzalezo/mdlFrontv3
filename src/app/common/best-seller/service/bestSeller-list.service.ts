import{Injectable} from '@angular/core';
import{Http,RequestOptions,Headers} from '@angular/http';
import {Config} from '../../../config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import {Libro} from '../model/bestSeller.model';

@Injectable()
export class BestSellerListService{
    Libros: Array<Libro>=[];
    constructor(private _http: Http){

    }
    getAll(): Observable <Array<Libro>>{
        //AQUI VA URL DEL SERVICIO QUE ENTREGA LA LISTA DE LIBROS
        const url= Config.API_SERVER_URL_LIBROS;
        const headers= new Headers({'Content-Type':'aplication/json'});
        const options= new RequestOptions({headers:headers});
        return this._http.get(url,options).map((response)=> {console.log(response); return response.json()});
    }
}