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
  constructor(private router:Router) { }

  ngOnInit() {
    this.logueado=this.ocultar();
  }
  logout(){
    console.log("logout");
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
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
