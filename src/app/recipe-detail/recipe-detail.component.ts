import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }
  // Reseptin haku
  // getRecipe(): void {
  //   this.route.params.subscribe((params) => {
  //     if (params['id'])
  //       this.recipe = this.recipeService.getRecipe(params['id']);
  //   });
  // }

  getRecipe(): void {
    // id tulee reitistä merkkijonona, pitää muuntaa numeroksi, voidaan tehdä + operaattorilla
    // const id = +this.route.snapshot.paramMap.get('id');
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService
      .getRecipe(id)
      .subscribe((recipe) => (this.recipe = recipe));
  }

  // Takaisin navigointi sivulla
  goBack(): void {
    this.location.back();
  }
}
