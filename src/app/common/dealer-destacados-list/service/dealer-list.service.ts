import{Injectable} from '@angular/core';
import{Http, RequestOptions, Headers} from '@angular/http';
import {Config} from '../../../config';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Dealer} from '../model/dealer.model';

@Injectable()
export class DealerListService {
    dealers: Array<Dealer> = [];
    constructor(private _http: Http) {

    }
    getAll(): Observable <Array<Dealer>> {
        //AQUI VA URL DEL SERVICIO QUE ENTREGA LA LISTA DE Dealer
        const url = Config.API_SERVER_URL_DEALERS;
        const headers = new Headers({'Content-Type': 'aplication/json'});
        const options = new RequestOptions({headers: headers});
        return this._http.get(url, options).map((response) => {console.log(response); return response.json(); });
    }
}
