import { RECIPES_ROUTES } from './recipes/recipes.routes';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent, children: RECIPES_ROUTES},
    { path: 'shopping-list', component: ShoppingListComponent}
];

export const RecipeBookRouting = RouterModule.forRoot(APP_ROUTES);