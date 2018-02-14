import { Recipe } from './recipe';

export class List {
  public id: number;
  public title: string;
  public recipes: Recipe[];

  constructor(id: number, title: string, recipes: Recipe[]) {
    this.id = id;
    this.title = title;
    this.recipes = recipes;
  }
}



