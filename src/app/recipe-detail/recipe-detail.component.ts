import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { List } from '../list';

import { RecipeService } from '../recipe.service';
import { SavedService } from '../saved/saved.service';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() list: List;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private savedService: SavedService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  saveRecipe(recipeId) {
    const listId = 1;
    this.recipeService.saveRecipe(listId, recipeId);
  }

  goBack(): void {
    this.location.back();
  }

}
