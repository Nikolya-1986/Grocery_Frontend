import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalDirective } from '../../components/modal/directives/modal.directive';
import { SharedStoreFacade } from '../../store/shared/shared.facade';
import { Grocery } from './model/grocery.model';
import { GroceryStoreFasade } from './store/grocery.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  @ViewChild(ModalDirective) public modal!: ModalDirective;
  
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
    this.groseries$ = this.groceryStore.groseries;
    this.isPreloader$ = this.sharedStore.preloader;
    this.errorMessage$ = this.sharedStore.errorMessage;
  };

  public trackByFn(ind: number, item: any): number {
    // console.log("Grocery:", item);
    return item;
  };

  public onAddItemToCart(grocery: Grocery): void {
    this.groceryStore.addItemToCart(grocery);
  }

  public aboutCalories(id: number): void {
    // console.log((id)); 
  };


}
