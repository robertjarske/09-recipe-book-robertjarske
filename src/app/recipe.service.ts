import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Http, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class RecipeService {
  private apiUrl = 'http://www.themealdb.com/api/json/v1/1/latest.php';

  constructor(
    private http: HttpClient,

  ) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get(this.apiUrl)
      .map((res: Response) => {
        console.log(res.meals);
        return res.meals.forEach(recipe => {
          let recipes: Recipe[] = [
            {id: recipe.idMeal, name: recipe.strMeal, description: recipe.strInstructions, photoUrl: recipe.strMealThumb}
          ];
        });

        // return <Recipe[]>res.meals;
      });
  }


  getRecipe(id: number): Observable<Recipe> {
    return of(RECIPES.find(recipe => recipe.id === id));
  }

}
