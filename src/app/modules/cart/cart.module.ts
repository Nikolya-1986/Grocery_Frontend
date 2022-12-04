import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from './store/reducer/cart-item.reducer';
import { CartEffect } from './store/effects/cart.effect';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule, 
    EffectsModule.forFeature([CartEffect]),
    StoreModule.forFeature('cartFeature', cartReducer),
  ]
})
export class CartModule { }
