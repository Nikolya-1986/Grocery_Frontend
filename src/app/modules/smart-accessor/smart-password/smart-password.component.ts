import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PasswordFormValues } from '../../auth/models/user-model';
import { CustomValidationService } from '../../../services/custom-validator.service';

@Component({
  selector: 'app-smart-password',
  templateUrl: './smart-password.component.html',
  styleUrls: ['./smart-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmartPasswordComponent),
      multi: true
    }
  ]
})
export class SmartPasswordComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public passwordReactiveForm!: FormGroup;
  public disabled: boolean = false;
  
  private subscriptions: Subscription[] = [];

  get value(): PasswordFormValues {
    return this.passwordReactiveForm.value;
  };
  
  set value(value: PasswordFormValues) {
    this.passwordReactiveForm.setValue(value);
    this.onChange(value);
    this.onTouched(value);
  };

  get control(): { [key: string]: AbstractControl<FormControl, FormControl> } {
    return this.passwordReactiveForm.controls;
  };

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
  ) { }

  public ngOnInit(): void {
    this.reactiveFormPassword();
  };

  public onChange: any = (value: PasswordFormValues) => {};
  public onTouched: any = (value: PasswordFormValues) => {};

  public writeValue(value: any): void {
    if(value) {
      this.value = value;
    } 
    if (value === null) {
      this.passwordReactiveForm.reset();
    }
  };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  };

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.passwordReactiveForm.disable() : this.passwordReactiveForm.enable();
  };

  public validate(_: FormControl) {
    return this.passwordReactiveForm.valid ? null : { passwords: { valid: false } };
  }
  // public validate(control: AbstractControl): ValidationErrors | null {
  //   return this.passwordReactiveForm.valid ? null : { passwords: { valid: this.passwordReactiveForm.value, message: `Nested form is invalid ${control}` } };
  // }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  };

  private reactiveFormPassword(): void {
    this.passwordReactiveForm = this.formBuilder.group({
      password: ['', 
        [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'), Validators.minLength(8), Validators.maxLength(26)]
      ],
      confirmPassword: ['', 
        [Validators.required]
      ],
    }, 
      { validators: this.customValidator.matchPasswordsValidator('password', 'confirmPassword') },
    );

    this.subscriptions.push(
      this.passwordReactiveForm.valueChanges
      .pipe()
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched(value);
      })
    )
  }

}

// https://www.learmoreseekmore.com/2022/06/angular14-reactive-forms-example.html?m=1
// https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
// https://stackblitz.com/edit/angular-14-form-validation?file=src%2Fapp%2Fapp.component.ts