import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgRatingBarModule } from 'ng-rating-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { groceryReducer } from './store/reducers/grocery.reducer';
import { GroceryEffect } from './store/effects/grocery.effect';
import { GroceryComponent } from './components/grocery/grocery.component';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { DirectivesModule } from 'src/app/directives/directive.module';

@NgModule({
  declarations: [
    HomeComponent,
    GroceryComponent,
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgRatingBarModule,
    StoreModule.forFeature('groceriesFeature', groceryReducer),
    EffectsModule.forFeature([GroceryEffect]),
    DirectivesModule,
    ModalModule
  ],
  entryComponents: [
    DirectivesModule,
    ModalModule
  ]
})
export class GroceryModule { }
