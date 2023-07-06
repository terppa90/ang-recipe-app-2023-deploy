import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplies-form',
  templateUrl: './supplies-form.component.html',
  styleUrls: ['./supplies-form.component.css'],
})
export class SuppliesFormComponent {
  @Input()
  public childForm!: FormGroup;
  // Taulukon index
  @Input()
  public arrayIndex: number;
  // Ainesosien määrä kokonaisuudessaan
  @Input()
  public totalSupplies: number;
  // Ainesosan poisto Eventti
  @Output()
  public deleteSupplyEvent: EventEmitter<number> = new EventEmitter<number>();
  // Käytetään get:iä että saadaan selkeämpää koodia templaattiin
  get nameField(): FormControl {
    return this.childForm?.get('name') as FormControl;
  }

  get quantityField(): FormControl {
    return this.childForm?.get('quantity') as FormControl;
  }

  constructor() {}
  // Reseptin ainesosan lisäysmetodi
  static addRecipeSupplyItem(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }
  // Reseptin ainesosan poistometodi
  public deleteSupply(index: number): void {
    this.deleteSupplyEvent.next(index);
  }
}
