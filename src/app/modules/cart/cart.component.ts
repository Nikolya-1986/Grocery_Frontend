import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CartItem } from './model/cart-item.model';
import { CartStoreFacade } from './store/cart-facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems$!: Observable<CartItem[]>;
  public totalPrice$!: Observable<number>;

  constructor(
    private cartStore: CartStoreFacade
  ) { }

  public ngOnInit(): void {
    this.downloadCart();
  };

  public onIncreaseItem(cartItem: CartItem) {
    this.cartStore.increaseItem(cartItem);
  };

  public onReduceItem(cartItem: CartItem) {
    this.cartStore.reduceItem(cartItem)
  };

  public onRemoveItem(cartItem: CartItem) {
    this.cartStore.removeItem(cartItem)
  };

  private downloadCart(): void {
    this.cartItems$ = this.cartStore.cartGrocery;
    this.totalPrice$ = this.cartStore.totalPrice;
  }

}
