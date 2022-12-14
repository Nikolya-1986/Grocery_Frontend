import { Grocery } from "../../home/models/grocery.model";

export interface CartItem {
  countOfItems: number;
  item: Grocery;
}