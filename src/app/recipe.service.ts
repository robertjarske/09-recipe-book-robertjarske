import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, flatMap, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { List } from './list';

import { environment } from '../environments/environment';

// const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//         'Authorization':  `Bearer ${jsonParse.data.access_token}`
//       })
//     };


@Injectable()
export class RecipeService {

  list: List[];

  constructor(
    private http: HttpClient
  ) {}

  getRecipes(query: string): Observable<Recipe[]> {
    let apiUrl = '';
    if (query == null || query === 'null') {
      apiUrl = `${environment.THE_MEAL_DB_API}/filter.php?c=vegetarian`;
    } else {

      apiUrl = `${environment.THE_MEAL_DB_API}/search.php?s=${query}`;
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
    const apiUrl = `${environment.THE_MEAL_DB_API}/lookup.php?i=${id}`;

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

    const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };

    const body = {list_id: +listId, recipe_id: recipeId};
    if (jsonParse.data.access_token) {
      this.http.post(`${environment.YUMMI_API}/save`, body, httpOptions)
      .subscribe();
    } else {

      return;
    }
  }

  removeRecipeFromList(listId: number, recipeId: number) {
    const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };

    if (jsonParse.data.access_token) {
    return this.http.delete(`${environment.YUMMI_API}/listrecipes/${listId}/${recipeId}`, httpOptions)
      .subscribe();
    } else {
      return;
    }


  }

  getLists() {
    const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };

    if (jsonParse.data.access_token) {
    return this.http.get(`${environment.YUMMI_API}/lists`, httpOptions)
      .pipe(
        map((lists: any) => {
          const list = Object.keys(lists.data).map(key => lists.data[key]);
          return list;
        })
      );
    } else {
      return;
    }
  }

  getList(listId: number) {
    const recipes: any[] = [];
    return this.http.get(`${environment.YUMMI_API}/listrecipes/${listId}`)
      .pipe(
        map((list: any) => {
          list = Object.keys(list).map(key => list[key]);
          return list.map((recipeId: any) => {
            return this.http.get(`${environment.THE_MEAL_DB_API}/lookup.php?i=${recipeId.recipe_id}`)
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
    const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };

    if (jsonParse.data.access_token) {
    return this.http.post(`${environment.YUMMI_API}/lists`, {title: listTitle}, httpOptions).subscribe();
    } else {
      return;
    }
  }

}
