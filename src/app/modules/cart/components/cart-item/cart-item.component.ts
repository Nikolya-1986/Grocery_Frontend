import { Component, Input, OnInit } from '@angular/core';
import { CatrGrocery } from '../../model/cart-grocery.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input()cartItem!: CatrGrocery | any;

  constructor() { }

  ngOnInit(): void {
  }

  public increaseItemInCart(): void{

  };

  public reduceItemInCart(): void{
    
  };

  public removeItemFromCart(): void{
    
  }

}
