import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RecipeActons from '../store/recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers'

@Injectable()
export class RecipeEffects{

    @Effect()
    recipeFetch = this.actions$
                .pipe( ofType(RecipeActons.FETCH_RECIPES),
                        switchMap((action: RecipeActons.FetchRecipes) => {
                            return this.http.get<Recipe[]>('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json')
                        }),
                        map( (recipes) => {
                            for(let recipe of recipes){
                                if(!recipe['ingredients']){
                                    recipe['ingredients'] = [];        
                                }        
                            } 
                            return {
                                type: RecipeActons.SET_RECIPES,
                                payload: recipes
                            };
                        })
                 );
    
    @Effect({dispatch: false})
    recipeStore = this.actions$
                    .pipe( ofType(RecipeActons.STORE_RECIPES),
                           withLatestFrom(this.store.select('recipes')),
                            switchMap( ([action, state]) => {
                                return this.http.put('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json', state.recipes);
                            } )
                    );
                        
                


    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>){}
}