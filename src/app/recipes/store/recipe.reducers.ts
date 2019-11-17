import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [ 
        new Recipe('Butter Chicken', 'Punjabi King Dish'
                    , 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Butter_Chicken_0000x0000_0.jpg' 
                    ,  [
                        new Ingredient('Chicken', 1),
                        new Ingredient('Butter', 2)
                    ]),
        new Recipe('Chicken Biryani '
                    , 'Biryani!!!', 'https://www.rachnas-kitchen.com/wp-content/uploads/2016/07/chicken-biryani-@4-1-e1505461223560.jpg', 
                    [
                        new Ingredient('Chicken', 1),
                        new Ingredient('Rice', 2)
                    ])
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){

    switch(action.type){
        case (RecipeActions.SET_RECIPES):
            return{
                ...state, recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPES):
            return {
                ...state, recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPES):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes : recipes
            };
        case (RecipeActions.DELETE_RECIPES):
            const oldRecipe = [...state.recipes];
            oldRecipe.splice(action.payload, 1);
            return{
                ...state,
                recipes: oldRecipe
            }
        default:
            return state;
    }
}