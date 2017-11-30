import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Libro } from 'app/common/book-list/models/book.model';
import { Cart } from 'app/common/cart/models/cart.model';
import { LibroListService } from 'app/common/book-list/services/newBook-list.service';
import { CartService } from 'app/common/cart/services/cart.service';
import { Observer } from 'rxjs/Observer';
import { CartItem } from 'app/common/cart/models/cart-item.model';
import { Pedido } from './models/pedido.model';
import { UrlPago} from './models/urlPago.model';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
interface ICartItemWithProduct extends CartItem {
  product: Libro;
  totalCost: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pedido :Pedido;
  urlPago: UrlPago;
  public cart: Observable<Cart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  router: Router;


  private products: Libro[];
  private cartSubscription: Subscription;

  constructor(private _librosListService: LibroListService,
              private _cartService: CartService,
              private _http:Http, 
              router: Router, pedido:Pedido , urlPago: UrlPago) {this.pedido=pedido; this.urlPago=urlPago; this.router=router;}

  public emptyCart(): void {
    this._cartService.empty();
  }

  public savePedido(){
  this.pedido.total=parseInt((parseInt(localStorage.getItem('totalPay'))).toString());
  this.pedido.estado="completado";
  this.pedido.dealer=parseInt(sessionStorage.getItem('id'));
  this.obtenerLinkPedido('Pago Mano Libros',this.pedido.total.toString(),sessionStorage.getItem('email'));
  console.log("click en guardar pedido");
  
  //this.guardarPedido(this.pedido);
  console.log("click en guardar pedido");
  }
  ngOnInit() {
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

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public removeProductFromCart(product: Libro): void {
    this._cartService.addItem(product, -1);
  }

  public addProductToCart(product: Libro): void {
    this._cartService.addItem(product, 1);
  }

  public productInCart(product: Libro): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this._cartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }


  guardarPedido(pedido:Pedido){
    const url= 'http://localhost:8000/pedidos/crear';
    const headers= new Headers({'Content-Type':'aplication/json'});
    const options= new RequestOptions({headers:headers});
    return this._http.post(url,pedido,options).map((response)=> {console.log(response); return response.json()}).subscribe(
      (data: Libro[])=>{console.log(data);},
      err=>{console.error();},
      ()=>{console.log("guardado en base de datos");}
      );
  }


  obtenerLinkPedido(asunto:string,amount:string,correo:string){
    const url= `http://localhost:8000/generar_pago/subject=${asunto}&amount=${amount}&payer_email=${correo}&notify_url=http://localhost:4200/home&return_url=http://localhost:4200/home&cancel_url=http://localhost:4200/asdasd`;
    const url= `http://localhost:8000/generar_pago/subject=${asunto}&amount=${amount}&payer_email=${correo}&pedido_id=2&notify_url=http://localhost:4200/exito&return_url=http://localhost:4200/exito&cancel_url=http://localhost:4200/fallo`;
    const headers= new Headers({'Content-Type':'aplication/json'});
    const options= new RequestOptions({headers:headers});
    return this._http.get(url,options).map((response)=> {console.log(response); return response.json()}).subscribe(
      (data: UrlPago)=>{this.urlPago=data;
      window.location.href=data.url_pago;
      console.log(this.urlPago);},
      err=>{console.error();},
      ()=>{console.log(this.urlPago);}
      );
  }

}
