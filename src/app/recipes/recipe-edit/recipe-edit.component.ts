import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import { RecipeService } from '../recipe.service';
//import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  receipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        this.initForm();
      }
    );
  }

  private initForm( ){
    
    let recipeName = '';
    let recipeUrl = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){

      this.store.select('recipes').pipe(take(1))
        .subscribe( (recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          //const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeUrl = recipe.imagePath;
          recipeDesc = recipe.description
          if(recipe['ingredients'] ){
            for(let i of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(i.name, Validators.required),
                  'amount': new FormControl(i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        } );
    }
    
    this.receipeForm = new FormGroup({
      'name':  new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeUrl, Validators.required),
      'description' : new FormControl(recipeDesc, Validators.required),
      'ingredients' : recipeIngredients
    });

  }

  onSubmit(){

    // const newRecipe = new Recipe(this.receipeForm.value['name'],
    //                               this.receipeForm.value['description'],
    //                               this.receipeForm.value['imagePath'],
    //                               this.receipeForm.value['ingredients']);

    if (this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipes({index: this.id, updatedRecipe: this.receipeForm.value}));
      //this.recipeService.updateRecipe(this.id, this.receipeForm.value);
    } else {
      this.store.dispatch(new RecipeActions.AddRecipes(this.receipeForm.value));
      //this.recipeService.addRecipe(this.receipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.receipeForm.get('ingredients')).push( new FormGroup ({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }) );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray> this.receipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }

}
