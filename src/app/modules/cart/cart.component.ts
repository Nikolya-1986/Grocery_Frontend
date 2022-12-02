import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CatrGrocery } from './model/cart-grocery.model';
import { CartStoreFacade } from './store/cart-facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems$!: Observable<CatrGrocery[]>;
  public totalPrice$!: Observable<number>;


  constructor(
    private cartStore: CartStoreFacade
  ) { }

  public ngOnInit(): void {
    this.downloadCart();
  }

  public closeCart() {

  }

  private downloadCart(): void {
    this.cartItems$ = this.cartStore.cartGrocery$;
    this.totalPrice$ = this.cartStore.totalPrice$;
  }

}
