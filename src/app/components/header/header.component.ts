import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShellCartFacade } from 'src/app/store/shell-cart/shell-cart.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public countOfItems$!: Observable<number>;
  public logo: string = 'assets/images/logo.png';
  
  constructor(
    private shellCartStore: ShellCartFacade
   ) { }

  public ngOnInit(): void {
    this.downloadCountOfItems();
  };

  private downloadCountOfItems(): void {
    this.countOfItems$ = this.shellCartStore.countOfItems;
  };

}
