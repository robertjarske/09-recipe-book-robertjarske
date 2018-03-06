import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, flatMap, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { List } from './list';
import { Restangular } from 'ngx-restangular';

const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };


@Injectable()
export class RecipeService {

  list: List[];

  constructor(
    private http: HttpClient,
    private restangular: Restangular
  ) {}

  getRecipes(query: string): Observable<Recipe[]> {
    let apiUrl = '';
    if (query == null || query === 'null') {

      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian`;
    } else {

      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    }

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
          meal['strIngredient'],
          meal['strInstructions'],
          meal['strMealThumb'],
          meal['strYoutube']
        );
        recipes.push(recipe);
          return recipes;
        })
      );
  }

  getRecipe(id: number): Observable<Recipe> {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    return this.http.get<Recipe>(apiUrl)
    .pipe(
      flatMap((res) => {
        return res['meals'];
      }),
      map((meal: Recipe) => {
        const ingredients = [];
          for (let i = 1; i < 30; i++) {
            if (meal[`strIngredient${i}`] !== '' && meal[`strIngredient${i}`] !== undefined) {
              const ing = {
                name: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
              };
              ingredients.push(ing);
            }
          }
          const recipe = new Recipe(
            +meal['idMeal'],
            meal['strMeal'],
            ingredients,
            meal['strInstructions'],
            meal['strMealThumb'],
            meal['strYoutube']
          );
          return recipe;
        })
      );
  }

  saveRecipe(listId: number, recipeId: number) {
    const body = {list_id: +listId, recipe_id: recipeId};
    this.http.post('http://yummy.test/api/save', body, httpOptions)
    .subscribe();
  }

  removeRecipeFromList(listId: number, recipeId: number) {
    return this.http.delete(`http://yummy.test/api/listrecipes/${listId}/${recipeId}`, httpOptions)
      .subscribe();

  }

  getLists() {
    return this.http.get(`http://yummy.test/api/lists`, httpOptions)
      .pipe(
        map((lists: any) => {
          const list = Object.keys(lists.data).map(key => lists.data[key]);
          return list;
        })
      );
  }

  getList(listId: number) {
    const recipes: any[] = [];
    return this.http.get(`http://yummy.test/api/listrecipes/${listId}`)
      .pipe(
        map((list: any) => {
          return list.map((recipeId: any) => {
            return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId.recipe_id}`)
            .pipe(
              map((res: any) => {
                  recipes.push(res);
                  list.recipes = recipes;
                  return list;
                })
              );
          });
        })
      );
  }

  createList(listTitle: string) {
    return this.http.post(`http://yummy.test/api/lists`, {title: listTitle}, httpOptions).subscribe();
  }

}
