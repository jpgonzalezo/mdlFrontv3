import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-resultado-pago',
  templateUrl: './resultado-pago.component.html',
  styleUrls: ['./resultado-pago.component.css']
})
export class ResultadoPagoComponent implements OnInit {
  pagoExito: boolean;
  //router: Router;
  constructor() { }

  ngOnInit() {
    this.pagoExito = this.ocultar();
  }

  public ocultar(){
    if(1){
      console.log("Pago exitoso");
      return true;
    }
    else{
      console.log("Pago fallido");
      return false;
    }
  }
/*
  public goToHome(){
    this.router.navigate(['/home']);
  }

  public goToCart(){
    this.router.navigate(['/cart']);
  }
*/


}
