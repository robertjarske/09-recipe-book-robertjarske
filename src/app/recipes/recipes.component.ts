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

  constructor(private recipeService: RecipeService) { }

  getRecipes(): void {
   this.recipeService.getRecipes()
    .subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  ngOnInit() {
    this.getRecipes();
  }

}
