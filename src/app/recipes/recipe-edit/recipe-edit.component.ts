import { Ingredient } from './../../shared/ingredient';
import { Subscription } from 'rxjs/Rx';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from "./../recipe";
import { FormArray, FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'bn-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  public recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private rs: RecipeService, 
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {      
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.rs.getRecipe(this.recipeIndex);          
        }
        else{
          this.isNew = true;
        }

        this.initForm();
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private  initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew){
      //Setting the ingredients       
      if(this.recipe.hasOwnProperty('ingredients')){
        for (let i = 0 ; i < this.recipe.ingredients.length; i++){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, 
              [
                Validators.required, Validators.pattern("\\d+")
              ])
            })
          );
        }
      }
      
      //Name
      recipeName = this.recipe.name; 
      //ImageUrl
      recipeImageUrl = this.recipe.imagePath;
      //Content
      recipeContent = this.recipe.description;
    }

    this.recipeForm = this.formBuilder.group({
        name: [recipeName, Validators.required],
        imagePath: [recipeImageUrl, Validators.required],
        description: [recipeContent, Validators.required],
        ingredients: recipeIngredients        
      });
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.isNew){
      this.rs.insertRecipe(newRecipe);
    } else {
      this.rs.updateRecipe(this.recipe, newRecipe);
    }

    this.navigateBack();

  }

  onCancel(){
    this.navigateBack();
  }

  onRemoveIngredient(i: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(i);
  }

  onAddIngredient(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
            name: new FormControl(name, Validators.required),
            amount: new FormControl(amount, 
            [
              Validators.required, Validators.pattern("\\d+")
            ])
          })
    );
  }

  private navigateBack(){
    this.router.navigate(['../']);
  }

}
