import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';
import { CartService } from 'app/common/cart/services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Cart } from 'app/common/cart/models/cart.model';
import { LibroListService } from 'app/common/book-list/services/newBook-list.service';
import { Libro } from 'app/common/book-list/models/book.model';
import { CartItem } from 'app/common/cart/models/cart-item.model';

interface ICartItemWithProduct extends CartItem {
  product: Libro;
  totalCost: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logueado: boolean;
  tipo: string;
  id: string;

  private cartSubscription: Subscription;
  public cart: Observable<Cart>;
  public itemCount: number;
  private products: Libro[];
  public cartItems: ICartItemWithProduct[];


  constructor(private router:Router, private _cartService: CartService, private _librosListService : LibroListService) { }

  ngOnInit() {
    this.logueado=this.ocultar();
    this.tipo=sessionStorage.getItem('tipo');
    this.id=sessionStorage.getItem('id');
    this.cart = this._cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this._librosListService.getAll().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.id === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.precio * item.quantity };
                           });
      });
    });
  }
  logout(){
    console.log("logout");
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('tipo');
    sessionStorage.removeItem('id');
    localStorage.removeItem('cart');
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
