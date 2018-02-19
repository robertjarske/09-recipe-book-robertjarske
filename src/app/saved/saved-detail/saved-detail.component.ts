import { Component, OnInit, Input } from '@angular/core';
import { Saved } from '../saved.model';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SavedService } from '../saved.service';
import { RecipeService } from '../../recipe.service';
import { Observable } from 'rxjs/Observable';
import { List } from '../../list';
import { Recipe } from '../../recipe';
import { forEach } from '@angular/router/src/utils/collection';





@Component({
  selector: 'app-saved-detail',
  templateUrl: './saved-detail.component.html',
  styleUrls: ['./saved-detail.component.css']
})
export class SavedDetailComponent implements OnInit {
  list: List;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savedService: SavedService,
    private recipeService: RecipeService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getSaved();
  }

  getSaved(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const that = this;
    this.recipeService.getList(id)
    .subscribe(res => {
      res.forEach(observable => {
        observable.subscribe(list => {
          return that.list = list;
        });
      });
    });

  }

  removeRecipe(listId: number, recipeId: number) {
    return this.recipeService.removeRecipeFromList(listId, +recipeId);
  }

  goBack(): void {
    this.location.back();
  }

}
