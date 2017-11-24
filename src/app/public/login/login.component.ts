import { Component, OnInit } from '@angular/core';
import {DealerListService} from '../../common/dealer-destacados-list/service/dealer-list.service';
import {Dealer} from '../../common/dealer-destacados-list/model/dealer.model';
import {SessionStorageService} from 'ngx-webstorage'
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Array<Dealer>;
  constructor(public _dealerList: DealerListService,
              public _locker: SessionStorageService,
              public _router: Router) { }

  ngOnInit() {
    this._dealerList.getAll().subscribe(
      (data: Dealer[])=>{this.usuarios=data;},
      err=>{console.error();},
      ()=>{console.log('libros obtenidos exitosamente');}
    );
  }

  onSubmit(form : NgForm) {

    for(let usuario of this.usuarios){
      if(form.value.username === usuario.correo && form.value.password === usuario.contrasena){
        localStorage.setItem(form.value.username,form.value.password);
        this._router.navigate(['/home']);
      }
    }
  }

}
