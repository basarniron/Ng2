import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient";

@Component({
  selector: 'bn-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  selectedItem: Ingredient = null;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.sls.getIngredients();
  }

  onSelectItem(ingredient: Ingredient){
    this.selectedItem = ingredient;
  }

  onCleared(){
    this.selectedItem = null;
  }

}
