import { Ingredient } from './../shared/ingredient';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients(){
    return this.ingredients;
  }

  addIngredients(ingredientsParam: Ingredient[]){    
    Array.prototype.push.apply(this.ingredients, ingredientsParam);    
  }

  addItem(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  editItem(oldingredient: Ingredient, newingredient: Ingredient){
    this.ingredients[this.ingredients.indexOf(oldingredient)] = newingredient;
  }

  deleteItem(ingredient: Ingredient){
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

}
