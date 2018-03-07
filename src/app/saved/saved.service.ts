import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Saved } from './saved.model';
import { Recipe } from '../recipe';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class SavedService {

  list: Saved;
  recipes: Observable<Recipe[]>;

  constructor() { }

  getLists() {
    const LISTS = [];
    const promise = new Promise((resolve, reject) => {
      fetch(`${environment.YUMMI_API}/saved`)
        .then(res => res.json())
        .then(res => {
          res.forEach(item => {
            LISTS.push(new Saved(
              item.id,
              item.title,
              item.recipes));
          });
          resolve(LISTS);
        });
    });

    return promise;
  }

  getList(listId: number) {
    let list: Saved;
    const promise = new Promise((resolve, reject) => {
      fetch(`${environment.YUMMI_API}/saved/${listId}`)
        .then(res => res.json())
        .then(res => {
          list = new Saved(
            res.id,
            res.title,
            res.recipes
          );
          resolve(list);
        });
    });

    return promise;
  }

  addRecipeToList(listId: number, recipeId: number) {
    const promise = new Promise((resolve, reject) => {
      fetch(`${environment.YUMMI_API}/saved/${listId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          recipes: [recipeId]
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    });
  }

}
