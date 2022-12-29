import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProfileFormValues } from '../../auth/models/user-model';
import { CustomValidationService } from '../../../services/custom-validator.service';

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
export class SmartProfileComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public profileReactiveForm!: FormGroup;
  public disabled: boolean = false;

  private subscriptions: Subscription[] = [];

  get value(): ProfileFormValues {
    return this.profileReactiveForm.value;
  };

  set value(value: ProfileFormValues) {
    this.profileReactiveForm.setValue(value);
    this.onChange(value);
    this.onTouched(value);
  };

  get control(): { [key: string]: AbstractControl<FormControl, FormControl> } {
    return this.profileReactiveForm.controls;
  };

  get contactTypeControl(): AbstractControl<FormControl, FormControl> | null | undefined {
    return this.profileReactiveForm.get('contacts.contactType') as FormControl;
  };

  get emailControl(): AbstractControl<FormControl, FormControl> | null | undefined {
    return this.profileReactiveForm.get('contacts.email') as FormControl;
  };

  get phoneControl(): AbstractControl<FormControl, FormControl> | null | undefined {
    return this.profileReactiveForm.get('contacts.phone') as FormControl;
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
  ) { }

  public onChange: any = (value: ProfileFormValues) => {};
  public onTouched: any = (value: ProfileFormValues) => {};

  public ngOnInit(): void {
    this.reactiveForm();
  };

  public writeValue(value: ProfileFormValues): void {
    if(value) {
      this.value = value;
    }
    if (value === null) {
      this.profileReactiveForm.reset();
    }
  };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  };
  
  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  };

  public validate(_: FormControl): { profile: { valid: boolean }} | null {
    return this.profileReactiveForm.valid ? null : { profile: { valid: false } };
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  };

  private reactiveForm(): void {
    this.profileReactiveForm = this.formBuilder.group({
      firstName: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9]+$"), Validators.minLength(3)]
      ],
      lastName: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z]+$"), Validators.minLength(3), Validators.maxLength(15)]
      ],
      dateOfBirth: ['', 
        [Validators.required, this.customValidator.compareDateValidator.bind(this.customValidator)]
      ],
      contacts: this.formBuilder.group({
        contactType: ['-1', 
          [this.customValidator.emailOrPhoneRequired()]
        ],
        email: ['', 
          [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+.[a-z]{2,3}')]
        ],
        phone: ['', 
          [Validators.required, Validators.pattern('^[0-9]+$')], 
        ]
      }),

    });

    this.subscriptions.push(
      this.profileReactiveForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched(value);
      })
    );
  };

}