import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedStoreFacade } from '../../store/shared/shared.facade';
import { Grocery } from './model/grocery.model';
import { GroceryStoreFasade } from './store/grocery.facade';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public groseries$!: Observable<Grocery[]>;
  public isPreloader$!: Observable<boolean>;
  public errorMessage$!: Observable<string>;

  constructor(
    private groceryStore: GroceryStoreFasade,
    private sharedStore: SharedStoreFacade,
  ) { }

  ngOnInit(): void {
    this.downloadData();
  }

  public downloadData(): void {
    this.groceryStore.getGroceries();
    this.sharedStore.getPreloader(true);
    this.groseries$ = this.groceryStore.groseries$;
    this.isPreloader$ = this.sharedStore.preloader$;
    this.errorMessage$ = this.sharedStore.errorMessage$;
  };

  public trackByFn(ind: number, item: any): number {
    // console.log("Grocery:", item);
    return item;
  };

  public addToCart(grocery: Grocery) {
    console.log(grocery);
    this.groceryStore.addIGroceryToCart(grocery);
  }

  public aboutCalories(id: number) {
    console.log((id)); 
  }

}
