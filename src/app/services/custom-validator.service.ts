import { Injectable } from "@angular/core";

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService  {

    public emailOrPhoneRequired(): ValidatorFn  {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value == '-1' ? { emailOrPhoneRequired: { value: control.value } } : null;
        };
    };

    public dateBirthdayValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const dateOfBirth = new Date(control.value);
        const today = new Date();
        return dateOfBirth > today ? { 'dateOfBirthInvalid': true } : null;
    }
}