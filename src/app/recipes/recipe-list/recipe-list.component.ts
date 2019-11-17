import { Component, OnInit } from '@angular/core';
//import {Recipe} from '../recipe.model';
//import {RecipeService} from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeState: Observable<fromRecipe.State> ;
  //subscription: Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    // this.subscription = this.recipeService.recipeChanged.subscribe( 
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();
  }

  redirectToNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

}
