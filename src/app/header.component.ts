import { Component } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";

@Component({
  selector: 'bn-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private rS: RecipeService) { }

  onStore(){
    this.rS.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  onFetch(){
    this.rS.fetchData();
  }
}
