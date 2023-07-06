import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../form.service';
import { RecipeService } from '../services/recipe.service';
import { Location } from '@angular/common';
import { Recipe } from '../models/recipe';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
// import { SuppliesFormComponent } from './supplies-form/supplies-form.component';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.css'],
})
export class EditrecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  // public myForm!: FormGroup;
  arrayIndex: number;

  editdata: any;
  formsupplies!: FormArray<any>;

  myForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    author: this.builder.control(''),
    recipe: this.builder.control(''),
    supplies: this.builder.array([]),
  });

  get supplies(): FormArray {
    return this.myForm.get('supplies') as FormArray;
  }

  constructor(
    private builder: FormBuilder,
    private formService: FormService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  // Käytetään get:iä että saadaan templaattiin selkeempää koodia

  // get supplies(): FormArray {
  //   return this.myForm.get('supplies') as FormArray;
  // }

  get f() {
    return this.myForm.controls;
  }

  addSupplies(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>(''),
      quantity: new FormControl<string>(''),
    });
  }

  // "Generoidaan" uusi lomake
  ngOnInit(): void {
    // this.generateMyForm();
    this.getRecipe();
  }

  // public generateMyForm(): void {
  //   this.myForm = new FormGroup({
  //     id: new FormControl(),
  //     name: new FormControl<string>(''),
  //     author: new FormControl<string>(''),
  //     supplies: new FormArray<any>([]),
  //     recipe: new FormControl<string>(''),
  //   });
  // }

  getRecipe(): void {
    // id tulee reitistä merkkijonona, pitää muuntaa numeroksi, voidaan tehdä + operaattorilla
    // const id = +this.route.snapshot.paramMap.get('id');
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService
      .editRecipe(id)
      // .subscribe((recipe) => (this.recipe = recipe));
      .subscribe((recipe) => {
        console.log(recipe);
        this.editdata = recipe;
        if (this.editdata.supplies != null) {
          for (let i = 0; i < this.editdata.supplies.length; i++) {
            this.addRecipeSupplyItem();
          }
        }

        this.myForm.patchValue({
          id: this.editdata.id,
          name: this.editdata.name,
          author: this.editdata.author,
          recipe: this.editdata.recipe,
          supplies: this.editdata.supplies,
        });
      });
    // ));
  }

  // Lisätään uusi ainesosa/raaka-aine
  addRecipeSupplyItem(): void {
    this.formsupplies = this.myForm.get('supplies') as FormArray;
    this.formsupplies.push(this.addRecipeSupplyItems());
  }

  // Poistetaan ainesosa/raaka-aine
  deleteSupply(index: number): void {
    this.supplies.removeAt(index);
  }

  addRecipeSupplyItems(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
    });
  }

  goBack() {
    this.location.back();
  }

  public submitRecipeForm(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.myForm.value);
    this.addRecipeSupplyItems();
    this.formService.FormUpdateRecipe(id, this.myForm.value).subscribe({
      next: (response) => console.log('success', response),
      error: (e) => console.log('Error', e),
    });
    this.router.navigate(['/recipes']);
  }
}

// https://www.youtube.com/watch?v=SbqHEOJyGU0
