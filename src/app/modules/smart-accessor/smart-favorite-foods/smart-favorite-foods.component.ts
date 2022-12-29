import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';

import { FavoriteFoodsFormValues } from '../../auth/models/user-model';

@Component({
  selector: 'app-smart-favorite-foods',
  templateUrl: './smart-favorite-foods.component.html',
  styleUrls: ['./smart-favorite-foods.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FavoriteFoodsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FavoriteFoodsComponent),
      multi: true,
    }
  ]
})
export class FavoriteFoodsComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public favoriteFoodReactiveForm!: FormGroup;
  public disabled: boolean = false;

  private subscriptions: Subscription[] = [];

  get value(): FavoriteFoodsFormValues {
    return this.favoriteFoodReactiveForm.value;
  };

  set value(value: FavoriteFoodsFormValues) {
    this.favoriteFoodReactiveForm.setValue(value);
    this.onChange(value);
    this.onTouched(value);
  };

  get favoriteFoodsControl(): FormArray<any> {
    return this.favoriteFoodReactiveForm.get('favoriteFoods') as FormArray;
  };

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.reactiveFormFavoriteFood();
    this.pathFavoriteFoodValue();
    this.handleFormChanges();
  };

  public addFoodFormGroup(): void {
    this.favoriteFoodsControl.push(
      this.formBuilder.group({
        food: ['', 
          [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z]+$")]
        ],
        rating: [0, 
          [Validators.required, Validators.pattern('^[0-9]+$')]
        ],
      })
    )
  };

  public removeFoodFormGroup(index: number): void {
    this.favoriteFoodsControl.removeAt(index);
  };

  public pathFavoriteFoodValue() {
    this.favoriteFoodsControl.patchValue([
      { food: 'Pizza pepperoni', rating: 1 }
    ])
  }

  public onChange: any = (value: FavoriteFoodsFormValues) => {};
  public onTouched: any = (value: FavoriteFoodsFormValues) => {};

  public writeValue(value: FavoriteFoodsFormValues): void {
    if(value) {
      this.value = value;
    }
    if(value === null) {
      this.favoriteFoodReactiveForm.reset();
    }
  };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  };

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled = this.disabled;
    isDisabled ? this.favoriteFoodReactiveForm.disable() : this.favoriteFoodReactiveForm.enable();
  };

  public validate(_: FormControl) {
    return this.favoriteFoodReactiveForm.valid ? null : { favoriteFoods: { valid: false } };
  };

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  };

  private reactiveFormFavoriteFood(): void {
    this.favoriteFoodReactiveForm = this.formBuilder.group({
      favoriteFoods: this.formBuilder.array([])
    })

    this.subscriptions.push(
      this.favoriteFoodReactiveForm.valueChanges
      .pipe()
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched(value);
      })
    );
  };

  private handleFormChanges(): void {
    combineLatest([this.favoriteFoodReactiveForm.valueChanges, this.favoriteFoodReactiveForm.statusChanges])
    .pipe()
    .subscribe((food: [any, FormControlStatus]) => {
      if(this.favoriteFoodReactiveForm.valid){
        console.log('Favorite Food Reactive Form validation status: SUCESS', food);
      }else{
        console.log('Favorite Food Reactive Form validation status: ERROR', food);
      }
    })
    this.triggerValidation(this.favoriteFoodReactiveForm);
  };

  private triggerValidation(group: FormGroup | FormArray | any): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if(abstractControl instanceof FormGroup || abstractControl instanceof FormArray){
        this.triggerValidation(abstractControl)
      }else {
        abstractControl.updateValueAndValidity({ onlySelf: false });
      }
    })
  };

}
