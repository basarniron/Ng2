import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'bn-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent implements OnInit {

  Recipes_SelectedRecipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
