import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
//import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
//import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  //editedItemIndex: number;
  editedItem : Ingredient;
  
  //constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });

        }else{
          this.editMode = false;
        }
      }
    );
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getShoppingListById(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      //this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    }else{
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(){
    //this.shoppingListService.startedEditing.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    //this.store.dispatch( new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.store.dispatch( new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
