import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Self, ViewChild, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-control-accessor',
  templateUrl: './control-accessor.component.html',
  styleUrls: ['./control-accessor.component.scss'],
  animations: [
    trigger(
      'visibilityChanged', [
        state('true', style({'height': '*', 'padding-top': '4px'})),
        state('true', style({'height': '30px', 'padding-top': '0px', 'margin-bottom': '5px'})),
        transition('*=>*', animate('1000ms')),
      ]
    )
  ],
})
export class ControlAccessorComponent implements  ControlValueAccessor, Validator, OnInit, AfterViewInit, OnDestroy {

  @ViewChild('formControlName') formControlName!: ElementRef;
  @ViewChild(DefaultValueAccessor) defaultValueAccessor!: DefaultValueAccessor;
  
  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public type = 'type';
  @Input() public isRequired!: boolean;
  @Input() public patternLettersNumbers!: string;
  @Input() public patternEmail!: string;
  @Input() public patternPassword!: string;

  private delegatedReplaySubject = new ReplaySubject<(_: ControlValueAccessor) => void>();
  private destroy$: Subject<boolean> = new Subject;
  private disabled!: boolean;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
  ) {
    this.controlDir.valueAccessor = this;
  };

  ngOnInit(): void {
    this.validate();
  }

  public ngAfterViewInit(): void {
    this.delegatedReplaySubject.pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => res(this.defaultValueAccessor))
  };
  
  public writeValue(value: string): void {
    if(this.formControlName){
      this.delegatedReplaySubject.next(valueAccessor => valueAccessor.writeValue(this.formControlName.nativeElement.value));
    }
  };

  public registerOnChange(value: (_: any) => void): void {
    this.delegatedReplaySubject.next(() => this.onChange = value);
  };

  public registerOnTouched(value: () => void): void {
    this.delegatedReplaySubject.next(() => this.onTouched = value);
  };

  public setDisabledState?(isDisabled: boolean): void {
    this.delegatedReplaySubject.next(() => this.disabled = isDisabled);
  };

  public onChange(event: any) { };

  public onTouched(event: any) { };

  public onValidationChange(event: any) { };

  public validate(): ValidationErrors | null {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control?.validator ? [control.validator] : [];

    if(this.isRequired) {
      validators.push(Validators.required);
    }
    if(this.patternLettersNumbers) {
      validators.push(Validators.pattern(this.patternLettersNumbers));
    }
    if(this.patternEmail) {
      validators.push(Validators.pattern(this.patternEmail));
    }
    if(this.patternPassword) {
      validators.push(Validators.pattern(this.patternPassword));
    }

    control?.setValidators(validators);
    control?.updateValueAndValidity();
    return validators;
  };

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  };

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  };

}
