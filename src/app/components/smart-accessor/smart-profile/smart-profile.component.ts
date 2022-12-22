import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileFormValues } from '../../../modules/auth/models/auth-model';

@Component({
  selector: 'app-smart-profile',
  templateUrl: './smart-profile.component.html',
  styleUrls: ['./smart-profile.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartProfileComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmartProfileComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartProfileComponent implements ControlValueAccessor, OnDestroy {

  public profileReactiveForm!: FormGroup;
  public disabled: boolean = false;
  
  private subscriptions: Subscription[] = [];

  get value(): ProfileFormValues {
    return this.profileReactiveForm.value;
  };

  set value(value: ProfileFormValues) {
    this.profileReactiveForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  };

  get firstNameControl() {
    return this.profileReactiveForm.controls['firstName'];
  };

  get lastNameControl() {
    return this.profileReactiveForm.controls['lastName'];
  };

  get emailControl() {
    return this.profileReactiveForm.controls['email'];
  };
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.profileReactiveForm = this.formBuilder.group({
      firstName: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9]+$"), Validators.minLength(3)]
      ],
      lastName: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z]+$"), Validators.minLength(3), Validators.maxLength(15)]
      ],
      email: ['', 
        [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+.[a-z]{2,3}')]
      ]
    });

    this.subscriptions.push(
      this.profileReactiveForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public ngOnInit(): void {
  }

  public writeValue(value: any): void {
    if(value) {
      this.value = value;
    }
    if (value === null) {
      this.profileReactiveForm.reset();
    }
  };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  };
  
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  };

  validate(_: FormControl) {
    return this.profileReactiveForm.valid ? null : { profile: { valid: false } };
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
