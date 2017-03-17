import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'bn-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() RecipeItem_Recipe: Recipe;
  @Input() recipeItemId: number;
}
