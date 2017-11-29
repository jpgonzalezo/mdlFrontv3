import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logueado: boolean;
  tipo: string;
  id: string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.logueado=this.ocultar();
    this.tipo=sessionStorage.getItem('tipo');
    this.id=sessionStorage.getItem('id');
  }
  logout(){
    console.log("logout");
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('tipo');
    sessionStorage.removeItem('id');
    this.router.navigate(['/home']);
  }

  public ocultar(){
    if(sessionStorage.getItem('email')===null){
      console.log("hay un logueado");
      return false;
    }
    else{
      console.log("no hay logueado");
      return true;
    }
  }
}
