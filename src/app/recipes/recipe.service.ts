// import {Recipe} from './recipe.model';
// //import { Injectable } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';
// import { Subject } from 'rxjs';
// //import { Store } from '@ngrx/store';
// //import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

// //@Injectable()
// export class RecipeService{

//     recipeChanged = new Subject<Recipe[]>();
//     private recipes: Recipe[] = [ 
//         new Recipe('Butter Chicken', 'Punjabi King Dish'
//                     , 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Butter_Chicken_0000x0000_0.jpg' 
//                     ,  [
//                         new Ingredient('Chicken', 1),
//                         new Ingredient('Butter', 2)
//                     ]),
//         new Recipe('Chicken Biryani '
//                     , 'Biryani!!!', 'https://www.rachnas-kitchen.com/wp-content/uploads/2016/07/chicken-biryani-@4-1-e1505461223560.jpg', 
//                     [
//                         new Ingredient('Chicken', 1),
//                         new Ingredient('Rice', 2)
//                     ])
//       ];

//     //constructor(private slService : ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>){    }  

//     //constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>){    }  

//     constructor(){    }  

//     getRecipes() {
//         return this.recipes.slice();
//     }

//     // addIngredientsToShoppingList(ingredients: Ingredient[]){
//     //     //this.slService.addIngredients(ingredients);
//     //     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
//     // }

//     // getRecipe(index: number ){
//     //     return this.recipes[index];
//     // }

//     // addRecipe(recipe: Recipe){
//     //     this.recipes.push(recipe);
//     //     this.recipeChanged.next(this.recipes.slice());
//     // }

//     // updateRecipe(index: number, newRecipe: Recipe){
//     //     this.recipes[index] = newRecipe;
//     //     this.recipeChanged.next(this.recipes.slice());
//     // }

//     // deleteRecipe(index: number){
//     //     this.recipes.splice(index, 1);
//     //     this.recipeChanged.next(this.recipes.slice());
//     // }

//     setRecipes(recipes : Recipe[]){
//         this.recipes = recipes;
//         this.recipeChanged.next(this.recipes.slice());
//     }

// }