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

    public matchingInputsValidator(firstKey: string, secondKey: string) {
        // return (group: FormGroup): ValidationErrors | undefined => {
        //     if(group.controls[firstKey].value !== group.controls[secondKey].value) {
        //         return { 'mismatch': true }
        //     }
        // }
        return function (group: FormGroup): ValidationErrors | any {
            if (group.controls[firstKey].value !== group.controls[secondKey].value) {
              return {
                'missmatch': true
              };
            }
        };
    }
}