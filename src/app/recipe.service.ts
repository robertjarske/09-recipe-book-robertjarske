import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, flatMap, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { List } from './list';
import { Restangular } from 'ngx-restangular';




@Injectable()
export class RecipeService {

  list: List[];

  constructor(
    private http: HttpClient,
    private restangular: Restangular
  ) {}

  getRecipes(): Observable<Recipe[]> {
    const apiUrl = 'http://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian';
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
            `http://${meal['strMealThumb']}`,
            meal['strYoutube']
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

  // saveRecipe(listId: number, recipeId: number): Observable<List> {
  //   const localUrl = `http://localhost:3000/saved/${listId}`;
  //   console.log(listId);
  //   console.log(recipeId);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   console.log(httpOptions);
  //   const body = {recipes: [recipeId]};
  //   console.log(body);
  //   return this.http.patch<List>(localUrl, body, httpOptions)
  //   .pipe(
  //     tap((list: List) => console.log(`added recipe w/ id=${recipeId}`))
  //   );
  // }

  saveRecipe(listId: number, recipeId: number) {
    this.restangular.one('saved', listId).get().subscribe(res => {
      res.recipes.push(recipeId);
      res.save();
    });
  }

  removeRecipeFromList(listId: number, recipeId: number): Observable<List> {
    return this.restangular.one('saved', listId).get().subscribe(res => {
      res.recipes = res.recipes.filter(id => id !== recipeId);
      res.save();
      this.getList(listId);
    });

  }

  getLists() {
    return this.restangular.all('saved').getList();
  }

  getList(listId: number) {
    const recipes: any[] = [];
    return this.http.get(`http://localhost:3000/saved/${listId}`)
      .pipe(
        map((list: any) => {
          return list.recipes.map((recipeId: any) => {
            return this.http.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
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
    return this.restangular.all('saved').post({ 'title': listTitle, 'recipes': [] });
  }

  deleteList(listId: number) {
    return this.restangular.one('saved', listId).remove();
  }
}
