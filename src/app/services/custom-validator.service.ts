import { Injectable } from "@angular/core";

import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService  {

    public emailOrPhoneRequired(): ValidatorFn  {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value == '-1' ? { emailOrPhoneRequired: { value: control.value } } : null;
        };
    };

    public compareDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const dateOfBirth = new Date(control.value);
        const today = new Date();
        return dateOfBirth > today ? { 'dateOfBirthInvalid': true } : null;
    };

    public matchPasswordsValidator(password: string, confirmPassword: string): ValidationErrors {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];
        
            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }else if (confirmPasswordControl.errors && !confirmPasswordControl.errors["mismatch"]) {
                return null;
            }else  if (passwordControl.value !== confirmPasswordControl.value) {
                return confirmPasswordControl.setErrors({ mismatch: true });
            } else {
                return confirmPasswordControl.setErrors(null);
            }
        }
      }
}