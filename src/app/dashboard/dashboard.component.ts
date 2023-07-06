import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private rs: RecipeService) {}

  // Haetaan reseptit sovelluksen käynnistyksen yhteydessä
  // ngOnInit(): void {
  //   this.recipes = this.rs.getAll();
  // }
  ngOnInit() {
    this.getRecipes();
  }

  // slicella määritetään kuinka monta reseptiä näkyy Etusivulla. Nyt näkyy 6 kpl.
  getRecipes(): void {
    this.rs
      .getRecipes()
      .subscribe((recipes) => (this.recipes = recipes.slice(0, 6)));
  }
}
