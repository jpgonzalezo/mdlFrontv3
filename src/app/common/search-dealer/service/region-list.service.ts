import{Injectable} from '@angular/core';
import{Http,RequestOptions,Headers} from '@angular/http';
import {Config} from '../../../config';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Region} from '../model/region.model';

@Injectable()
export class RegionListService{
    constructor(private _http: Http){
    }
    getAll(): Observable <Array<Region>>{
        //AQUI VA URL DEL SERVICIO QUE ENTREGA LA LISTA DE LIBROS
        const url= Config.API_SERVER_URL_REGIONES;
        const headers= new Headers({'Content-Type':'aplication/json'});
        const options= new RequestOptions({headers:headers});
        return this._http.get(url,options).map((response)=> {console.log(response); return response.json()});
    }
}