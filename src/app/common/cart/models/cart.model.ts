import { CartItem } from "./cart-item.model";

export class Cart {
  public items: CartItem[] = new Array<CartItem>();
  public itemsTotal: number = 0;

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.itemsTotal = src.itemsTotal;
  }
}
