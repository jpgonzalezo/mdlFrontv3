import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Libro } from 'app/common/book-list/models/book.model';
import { Cart } from 'app/common/cart/models/cart.model';
import { LibroListService } from 'app/common/book-list/services/newBook-list.service';
import { CartService } from 'app/common/cart/services/cart.service';
import { Observer } from 'rxjs/Observer';
import { CartItem } from 'app/common/cart/models/cart-item.model';

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
  
  public cart: Observable<Cart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  public comision: number;

  private products: Libro[];
  private cartSubscription: Subscription;

  constructor(private _librosListService: LibroListService,
    private _cartService: CartService) { }

  public emptyCart(): void {
    this._cartService.empty();
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

}
