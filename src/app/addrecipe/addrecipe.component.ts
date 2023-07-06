import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../form.service';
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
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css'],
})
export class AddrecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  recipes: Recipe[] = [];
  public myForm!: FormGroup;
  arrayIndex: number;

  get suppliesArray(): FormArray {
    return this.myForm?.get('supplies') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  // Käytetään get:iä että saadaan templaattiin selkeempää koodia

  get supplies() {
    return this.myForm.get('supplies') as FormArray;
  }

  get f() {
    return this.myForm.controls;
  }

  addSupplies(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      quantity: new FormControl(),
    });
  }

  // "Generoidaan" uusi lomake
  ngOnInit(): void {
    this.generateMyForm();
  }

  public generateMyForm(): void {
    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      author: new FormControl(''),
      supplies: new FormArray([]),
      recipe: new FormControl(''),
    });
  }

  // Lisätään uusi ainesosa/raaka-aine
  addRecipeSupplyItem(): void {
    this.suppliesArray.push(this.addRecipeSupplyItems());
  }
  // Poistetaan ainesosa/raaka-aine
  deleteSupply(index: number): void {
    this.suppliesArray.removeAt(index);
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
    console.log(this.myForm.value);
    this.addRecipeSupplyItems();
    this.formService.FormAddRecipe(this.myForm.value).subscribe({
      next: (response) => console.log('success', response),
      error: (e) => console.log('Error', e),
    });
    this.router.navigate(['/recipes']);
  }
}
