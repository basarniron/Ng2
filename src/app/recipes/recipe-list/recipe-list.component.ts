import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'bn-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  
  public recipeList: Recipe[] = [];
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
   this.recipeList = this.recipeService.getRecipes();
   this.recipeService.recipeRetrieved.subscribe(
     (recipeList: Recipe[]) => this.recipeList = recipeList
   );   
  }
 
}
