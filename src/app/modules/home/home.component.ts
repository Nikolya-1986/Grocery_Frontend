import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Grocery } from './model/grocery.model';
import { GroceryStoreFasade } from './store/grocery.facade';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public grocery$!: Observable<Grocery[]>;

  constructor(
    private groceryStore: GroceryStoreFasade,
  ) { }

  ngOnInit(): void {
    this.downloadData();
  }

  public downloadData(): void {
    this.groceryStore.getGroceries();
    this.grocery$ = this.groceryStore.groseries$;
  };

  public trackByFn(ind: number, item: any): number {
    // console.log("Grocery:", item);
    return item;
  };

}
