import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PasswordFormValues } from '../../auth/models/user-model';
import { CustomValidationService } from '../../../services/custom-validator.service';
import { CodeQuestions } from '../../auth/enum/auth-enum';

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
export class SmartPasswordComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

  public passwordReactiveForm!: FormGroup;
  public disabled: boolean = false;
  public questions = [CodeQuestions.maiden_Name, CodeQuestions.pet_Name, CodeQuestions.favorite_Fruit];
  public selectedQuestion!: Object | any;
  public showAnswer: boolean = false;
  
  private subscriptions: Subscription[] = [];
  private thirdPartyControls: { [key: string]: FormControl } = {
    answer: new FormControl('', [Validators.required]),
    significance: new FormControl({ value: '', disabled: true }, [Validators.required]),
  };

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
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.reactiveFormPassword();
  };

  public ngAfterViewInit(): void {
    this.control['codeQuestion']
      .valueChanges.subscribe(this.onSelectedQuestionChange.bind(this));
  }


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

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.passwordReactiveForm.valid ? null : { passwords: { valid: this.passwordReactiveForm.value, message: `Nested form is invalid ${control}` } };
  };

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
      codeQuestion: ['']
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
  };

  private onSelectedQuestionChange(value: string | any): void {
    switch(value) {
      case('Mother is maiden name'): 
        this.selectedQuestion = { answer: 'Karnataka', significance: 1 };
        break;
      case('What is your pet is name'):
        this.selectedQuestion = { answer: 'Archi', significance: 2 };
        break
      case('What is your favorite fruit'):
        this.selectedQuestion = { answer: 'Strawberry', significance: 3 };
        break;
    }
    // add form controls and value
    this.toggleControls(true, this.thirdPartyControls, this.selectedQuestion);
  };

  private toggleControls(show: boolean, formMeta: object | any, data?: { [key: string]: string } | any) {
    this.showAnswer= show;
    Object.keys(formMeta).forEach((formControlName) => {
      if(!show) {
        this.passwordReactiveForm.removeControl(formControlName);
        return;
      } else {
        this.passwordReactiveForm.addControl(formControlName, formMeta[formControlName]);
        this.passwordReactiveForm.setValidators([Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9]+$"), Validators.minLength(3)])
        this.passwordReactiveForm.get(formControlName)?.patchValue(data[formControlName])
      }
    })
    this.passwordReactiveForm.updateValueAndValidity();
    this.changeDetectorRef.detectChanges()
  }

}

// https://www.learmoreseekmore.com/2022/06/angular14-reactive-forms-example.html?m=1
// https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
// https://stackblitz.com/edit/angular-14-form-validation?file=src%2Fapp%2Fapp.component.ts