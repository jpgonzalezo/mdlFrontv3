import {Injectable} from '@angular/core';
import {HttpService} from '../../../http.service';
import {SessionStorageService} from 'ngx-webstorage';
import 'rxjs/add/operator/map';
import {Config} from '../../../config';


@Injectable()
export class AuthenticationService {
  hasSession = false;
  user;
  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _locker: SessionStorageService) {
  }

  public isLoggedIn() {
    const user = this._locker.retrieve('user');
    if (!!user) {
      this.user = user;
      this.hasSession = true;
    }
    return this.hasSession;
  }

  public logIn(correo: string, contrasena: string) {
    const url = `${this.apiBaseURL}/dealers/todos`;

    return this._http.post(url, {
      'correo': correo,
      'contrasena': contrasena,
    });
  }

  public logout() {
    this.user = null;
    this.hasSession = false;
    this._locker.clear('user');
  }

  public logueado() {
    if (sessionStorage.getItem('email') === null) {
      console.log('hay un logueado');
      return false;
    } else {
      console.log('no hay logueado');
      return true;
    }
  }

}
