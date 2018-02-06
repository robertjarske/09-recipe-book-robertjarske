import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';


@Injectable()
export class RecipeService {

  constructor() { }

  getRecipes(): Recipe[] {
    console.log(RECIPES);
    return RECIPES;
  }

}
