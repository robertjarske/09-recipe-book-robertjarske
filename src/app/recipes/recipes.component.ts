import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  selectedRecipe: Recipe;

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  constructor(private recipeService: RecipeService) { }

  getRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnInit() {
    this.getRecipes();
  }

}
