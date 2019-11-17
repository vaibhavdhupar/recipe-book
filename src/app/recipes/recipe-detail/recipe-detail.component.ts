import { Component, OnInit } from '@angular/core';
//import { Recipe } from '../recipe.model';
//import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
//import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import { take } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState : Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>){

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //this.selectedRecipe = this.recipeService.getRecipe(this.id);
        this.recipeState = this.store.select('recipes');
      }
    );

  }

  addToShoppingList(){
    //this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe( (recipeState: fromRecipe.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    } );
    
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    //this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
