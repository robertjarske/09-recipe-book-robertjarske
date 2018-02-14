import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { List } from '../list';
import { Saved } from '../saved/saved.model';


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
  private showModal: boolean;
  private selectedId: number;
  private listTitle: string;

  constructor(private recipeService: RecipeService) {
    this.filters = [
      {
        id: 0,
        description: 'All'
      },
      {
        id: 1,
        description: 'Gluten'
      },
      {
        id: 2,
        description: 'Lactose'
      },
      {
        id: 3,
        description: 'Low fat'
      },
      {
        id: 4,
        description: 'Balanced'
      },
    ];
  }

  getRecipes(): void {
   this.recipeService.getRecipes()
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


  ngOnInit() {
    this.getRecipes();

    this.recipeService.getLists().subscribe(res => this.lists = res);
  }
}


