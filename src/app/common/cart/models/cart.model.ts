import { CartItem } from "./cart-item.model";

export class Cart {
  public items: CartItem[] = new Array<CartItem>();
  public deliveryOptionId: string;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
