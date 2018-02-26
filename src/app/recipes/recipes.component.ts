import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { List } from '../list';
import { Saved } from '../saved/saved.model';

const delay = (() => {
  let timer = 0;
  return (callback, ms) => {
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  filters: any[];
  recipes: Recipe[];
  lists: List[];
  toggle: boolean;
  public showModal: boolean;
  private selectedId: number;
  private listTitle: string;

  constructor(private recipeService: RecipeService) {
    this.filters = [
      {
        id: 0,
        description: 'Pasta'
      },
      {
        id: 1,
        description: 'Vegan'
      },
      {
        id: 2,
        description: 'Vegetarian'
      },
    ];
  }

  ngOnInit() {
    this.getRecipes(null);

    this.recipeService.getLists().subscribe(res => this.lists = res);
  }

  getRecipes(query: string): void {
   this.recipeService.getRecipes(query)
    .subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  toggleModal(recipeId: number) {
    this.selectedId = recipeId;
    this.showModal = !this.showModal;
  }

  addRecipe(listId: number) {
    this.recipeService.saveRecipe(listId, this.selectedId);
    this.showModal = !this.showModal;
  }

  addList(listTitle: string) {
    this.recipeService.createList(listTitle);
    this.showModal = !this.showModal;
  }

  search(query) {
    delay(() => {
      this.recipeService.getRecipes(query).subscribe(recipes => {
        this.recipes = recipes;
      });
    }, 700);
  }

}




