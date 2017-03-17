import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';

@Component({
  selector: 'bn-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private Recipe_Detail_SelectedRecipeIndex: number;

  Recipe_Detail_SelectedRecipe: Recipe;

  constructor(private sls: ShoppingListService, 
              private route: ActivatedRoute, 
              private rs: RecipeService,
              private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.Recipe_Detail_SelectedRecipeIndex = param['id'];
        this.Recipe_Detail_SelectedRecipe = this.rs.getRecipe(this.Recipe_Detail_SelectedRecipeIndex);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddToShoppingList(){
    this.sls.addIngredients(this.Recipe_Detail_SelectedRecipe.ingredients );
  }

  onEdit(){
    this.router.navigate(['/recipes', this.Recipe_Detail_SelectedRecipeIndex, 'edit']);
  }

  onDelete(){
    if(confirm("Do you want to proceed on deleting the current recipe?")){
      this.rs.deleteRecipe(this.Recipe_Detail_SelectedRecipe);
      this.router.navigate(['/recipes']);
    }
  }

}
