import { CartItem } from "./cart-item.model";

export class Cart {
  public items: CartItem[] = new Array<CartItem>();
  public grossTotal: number = 0;

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
  }
}
