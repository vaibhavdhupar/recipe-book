import {Component, OnInit} from '@angular/core'; 
//import { DataStorageService } from '../../shared/data-storage.service';
//import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector : 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor( private store: Store<fromApp.AppState>){

    }

    ngOnInit(){
        this.authState = this.store.select('auth');
    }

    //@Output() selectedFeature = new EventEmitter<string>();

    // headerLinkSelected(feature: string){
    //     console.log('inside onOptionSelected: ' + feature);
    //     this.selectedFeature.emit(feature);
    // }

    onSaveData(){
        // this.dsService.storeRecipes().subscribe(
        //     (servers) => {
        //         console.log(servers);
        //     }
        // );
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData(){
        //this.dsService.fetchRecipes();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
        console.log('inside logout');
        //this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }

    // isAuthenticated() {
    //     return this.authService.isAuthenticated();
    // }
    

}