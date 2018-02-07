import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, flatMap, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    const apiUrl = 'http://www.themealdb.com/api/json/v1/1/latest.php';
    const recipes = [];

    return this.http.get<Recipe[]>(apiUrl)
      .pipe(
        flatMap((res) => {
          return res['meals'];
        }),
        map((meal: Recipe[]) => {
          const recipe = new Recipe(
            +meal['idMeal'],
            meal['strMeal'],
            meal['strInstructions'],
            meal['strMealThumb']
          );
          recipes.push(recipe);
          return recipes;
        })
      );
  }

  getRecipe(id: number): Observable<Recipe> {
    const apiUrl = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    return this.http.get<Recipe>(apiUrl)
      .pipe(
        flatMap((res) => {
          return res['meals'];
        }),
        map((meal: Recipe) => {
          const recipe = new Recipe(
            +meal['idMeal'],
            meal['strMeal'],
            meal['strInstructions'],
            meal['strMealThumb']
          );
          return recipe;
        })
      );
  }
}
