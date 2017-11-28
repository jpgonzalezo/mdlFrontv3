import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Libro } from 'app/common/book-list/models/book.model';
import { Cart } from 'app/common/cart/models/cart.model';
import { LibroListService } from 'app/common/book-list/services/newBook-list.service';
import { CartService } from 'app/common/cart/services/cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: Observable<Libro[]>;
  public cart: Observable<Cart>;
  public itemCount: number;

  private cartSubscription: Subscription;

  constructor(private _librosListService: LibroListService,
    private _cartService: CartService) { }S

  public emptyCart(): void {
    this._cartService.empty();
  }
  ngOnInit() {
    this.products = this._librosListService.getAll();
    this.cart = this._cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
