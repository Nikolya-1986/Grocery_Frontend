import { Component, Input, OnInit } from '@angular/core';
import { Grocery } from '../../model/grocery.model';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {

  @Input() grocery!: Grocery;
  
  constructor() { }

  ngOnInit(): void {
  }

}
