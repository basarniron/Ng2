import { Ingredient } from './../shared/ingredient';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {

  private recipeList: Recipe[] = [
    new Recipe('Schnitzel','Very Tasty','http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Summer Salad','Okayish','http://www.simplesweetsavory.com/wp-content/uploads/2015/06/Rainbow-Summer-Salad.jpg', [
      new Ingredient('Lettuce', 3),
      new Ingredient('Tomato',1),
      new Ingredient('Package Black Olives', 1)
    ])
  ];

  recipeRetrieved = new EventEmitter();
  constructor(private http: Http) { }

  //Get Recipes
  getRecipes(){
    return this.recipeList;
  }

  getRecipe(id: number){
    return this.recipeList[id];
  }

  insertRecipe(recipe: Recipe){
    this.recipeList.push(recipe);
  }

  updateRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipeList[this.recipeList.indexOf(oldRecipe)] = newRecipe;
  }

  deleteRecipe(recipe: Recipe){
    this.recipeList.splice(this.recipeList.indexOf(recipe), 1);
  }

  storeData(){
    const body = JSON.stringify(this.recipeList);
    const headers = new Headers({
      'Content-Type':'application/json'
    });
    
    return this.http.put('https://recipe-book-1a45a.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(){
    console.log('fetchData is called');
    return this.http.get('https://recipe-book-1a45a.firebaseio.com/recipes.json')
    .map((response: Response) => response.json())
    .subscribe(
      (data: Recipe[]) => {
        this.recipeList = data;
        this.recipeRetrieved.emit(this.recipeList);
      }      
    );
  }
}
