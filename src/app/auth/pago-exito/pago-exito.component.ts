import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/common/cart/services/cart.service';

@Component({
  selector: 'app-pago-exito',
  templateUrl: './pago-exito.component.html',
  styleUrls: ['./pago-exito.component.css']
})
export class PagoExitoComponent implements OnInit {
  _cartService: CartService;
  constructor(_cartService: CartService) { }

  ngOnInit() {
    this._cartService.empty();
  }

}
