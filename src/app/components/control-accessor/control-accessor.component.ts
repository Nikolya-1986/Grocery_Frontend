import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-accessor',
  templateUrl: './control-accessor.component.html',
  styleUrls: ['./control-accessor.component.scss'],
})
export class ControlAccessorComponent implements  ControlValueAccessor {

  @Input() public label!: string;
  @Input() public type!: string;
  @Input() public placeholder!: string;
  @Input() public data!: string;
  @Input() public minlength: number = 0;
  @Input() public required: boolean = false;
  @Input() public patternLettersNumbers!: string;
  @Input() public patternEmail!: string;
  @Input() public patternPassword!: string;
  @Input() public disabled = false;

  private errorMessages = new Map<string, () => string>();
  private    validationMessages = {
    required: 'must be is required filed!',
    minlength: 'Сharacters should not be less than',
    patternLettersNumbers: 'must contain onlyletters and numbers!'
  }
  
  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    this.ngControl && (this.ngControl.valueAccessor = this);
    this.errorMessages.set('required', () => `${this.label} ${this.validationMessages.required}`);
    this.errorMessages.set('minlength', () => `${this.validationMessages.minlength} ${this.minlength}`);
    this.errorMessages.set('patternLettersNumbers', () => `${this.label} ${this.validationMessages.patternLettersNumbers}`);
  }

  public get invalid(): boolean | null {
    return this.ngControl ? this.ngControl.invalid : false;
  }

  public get showError(): boolean | null {
    if (!this.ngControl) {
      return false;
    }
    const { dirty, touched } = this.ngControl;
    return this.invalid ? (dirty || touched) : false;
  }

  public get errors(): Array<string> {
    if (!this.ngControl) {
      return [];
    }

    const { errors }: ValidationErrors = this.ngControl;
    return Object.keys(errors).map(key =>  {
      console.log(key);
      
      return this.errorMessages.get(key)?.() ?? <string>errors[key] ?? key
    });
  }

  public onChangeFn = (_: any) => {};
  public onTouchedFn = () => {};

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.data = obj;
    console.log(this.data);
  }

  public onChange(): void {
    this.onChangeFn(this.data);
  }

}
