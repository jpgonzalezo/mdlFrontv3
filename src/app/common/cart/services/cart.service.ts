import { Injectable } from '@angular/core';
import { Cart } from 'app/common/cart/models/cart.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Libro } from 'app/common/book-list/models/book.model';
import { LibroListService } from 'app/common/book-list/services/newBook-list.service';
import { CartItem } from 'app/common/cart/models/cart-item.model';

const CART_KEY = "cart";

@Injectable()
export class CartService {
  private storage: Storage;
  private subscriptionObservable: Observable<Cart>;
  private subscribers: Array<Observer<Cart>> = new Array<Observer<Cart>>();
  private products: Libro[];

  public constructor(private _libroListService: LibroListService) {
    this.storage = localStorage;
    this._libroListService.getAll().subscribe((products) => this.products = products);

    this.subscriptionObservable = new Observable<Cart>((observer: Observer<Cart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<Cart> {
    return this.subscriptionObservable;
  }

  public addItem(product: Libro, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new Cart();
    this.save(newCart);
    this.dispatch(newCart);
  }


  private calculateCart(cart: Cart): void {
    cart.grossTotal = cart.items
                          .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).precio)
                          .reduce((previous, current) => previous + current, 0);
  }

  
  private retrieve(): Cart {
    const cart = new Cart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: Cart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
    this.storage.setItem('totalPay', JSON.stringify(cart.grossTotal*0.7));
  }

  private dispatch(cart: Cart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }
}
