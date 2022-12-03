import { Grocery } from "../../home/model/grocery.model";

export interface CartItem {
  countOfItems: number;
  item: Grocery;
}