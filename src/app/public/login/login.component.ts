import { Component, OnInit } from '@angular/core';
import {DealerListService} from '../../common/dealer-destacados-list/service/dealer-list.service';
import {Dealer} from '../../common/dealer-destacados-list/model/dealer.model';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Editorial} from '../../common/editorial-list/model/editorial.model';
import {EditorialListService} from '../../common/editorial-list/service/editorial-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Array<Dealer>;
  editoriales: Array<Editorial>;
  constructor(public _dealerList: DealerListService,
              public _locker: SessionStorageService,
              public _editorialList: EditorialListService,
              public _router: Router) { }

  ngOnInit() {
    this._dealerList.getAll().subscribe(
      (data: Dealer[]) => {this.usuarios = data; },
      err => {console.error(); },
      () => {console.log('libros obtenidos exitosamente'); }
    );
    this._editorialList.getAll().subscribe(
      (data: Editorial[]) => {this.editoriales = data; },
      err => {console.error(); },
      () => {}
    );
  }

  onSubmit(form: NgForm) {
    for (const usuario of this.usuarios) {
      if (form.value.username === usuario.correo && form.value.password === usuario.contrasena) {
        sessionStorage.setItem('email', form.value.username);
        sessionStorage.setItem('password', form.value.password);
        sessionStorage.setItem('tipo', '0');
        sessionStorage.setItem('id', usuario.id.toString());
        this._router.navigate(['/perfil', '0', usuario.id]);
        location.reload(true);
      }
    }
    for (const editorial of this.editoriales) {
      if (form.value.username === editorial.correo && form.value.password === editorial.contrasena) {
        sessionStorage.setItem('email', form.value.username);
        sessionStorage.setItem('password', form.value.password);
        sessionStorage.setItem('tipo', '1');
        sessionStorage.setItem('id', editorial.id.toString());
        this._router.navigate(['/perfil', '1', editorial.id]);
        location.reload(true);
      }
    }
  }

}
