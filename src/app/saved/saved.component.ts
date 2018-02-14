import { Component, OnInit } from '@angular/core';
import { SavedService } from './saved.service';
import { Saved } from './saved.model';
import { List } from '../list';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {


  list: List[];

  constructor(

    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    const that = this;
    this.recipeService.getLists().subscribe((list: List[]) => {
      return that.list = list;
    });
  }

}
