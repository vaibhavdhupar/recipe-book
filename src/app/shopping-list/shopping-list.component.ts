import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
//import { ShoppingListService } from './shopping-list.service';
//import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
//import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit
//, OnDestroy
 {

  //private subscription: Subscription;

  shoppingListState : Observable<{ingredients: Ingredient[]}>;

  //constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    
    //this.ingredients = this.shoppingListService.getShoppingList(); 
    this.shoppingListState = this.store.select('shoppingList'); 

    // this.subscription = this.shoppingListService.ingredientChanged.subscribe(
    //   (ingredients : Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

  onEditItem(index: number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch( new ShoppingListActions.StartEdit(index));
  }

}
