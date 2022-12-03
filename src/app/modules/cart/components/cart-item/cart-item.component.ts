import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartItem } from '../../model/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() public cartItem!: CartItem | any;
  @Output() public increaseItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() public reduceItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() public removeItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit(): void {
  }

  public increaseItemInCart(cartItem: CartItem): void{
    this.increaseItem.emit(cartItem);
  };

  public reduceItemInCart(cartItem: CartItem): void{
    this.reduceItem.emit(cartItem);
  };

  public removeItemFromCart(cartItem: CartItem): void{
    this.removeItem.emit(cartItem);
  }

}
