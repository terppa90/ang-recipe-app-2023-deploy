import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  @Input() recipe!: Recipe;
  recipes: Recipe[] = [];
  constructor(
    private rs: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRecipes();
  }

  // slicella määritetään kuinka monta reseptiä näkyy Etusivulla. Nyt näkyy 6 kpl.
  getRecipes(): void {
    this.rs.getRecipes().subscribe((recipes) => (this.recipes = recipes));
  }

  // poistaa reseptin
  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter((h) => h !== recipe);
    this.rs.delRecipe(String(recipe.id)).subscribe();
    this.router.navigate(['/dashboard']);
  }

  // Muokkaa resepti'
  editRecipe() {
    this.router.navigate(['/edit/{{recipe.id}}']);
  }
}
