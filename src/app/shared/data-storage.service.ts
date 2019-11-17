// import { Injectable } from '@angular/core';
// import { RecipeService } from '../recipes/recipe.service';
// import { HttpClient } from '@angular/common/http';
// import { Recipe } from '../recipes/recipe.model';
// //import { AuthService } from '../auth/auth.service';

// @Injectable()
// export class DataStorageService {

//     constructor(private http: HttpClient, private recipeService: RecipeService){

//     }

//     storeRecipes(){
//         //const token = this.authService.getToken();
//         //return this.http.put('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json?auth=' +  token, this.recipeService.getRecipes());
//         return this.http.put('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json', this.recipeService.getRecipes());
//     }


//     fetchRecipes(){
//         //const token = this.authService.getToken();
//         //return this.http.get('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json?auth=' +  token ).subscribe(
//         return this.http.get('https://ng-recipe-book-bfa08.firebaseio.com/recipes.json').subscribe(
//             (recipes: Recipe[]) => {

//                 for(let recipe of recipes){
//                     if(!recipe['ingredients']){
//                         recipe['ingredients'] = [];        
//                     }        
//                 }
//                 this.recipeService.setRecipes(recipes);
//             }
//         );
//     }
// }