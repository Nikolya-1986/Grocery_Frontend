import { AbstractControl } from '@angular/forms';

export class PasswordMatchValidator {

    static passwordMatchValidator(control: AbstractControl | any) {
        const password: string = control.get('password').value;
        const passwordRepeat: string = control.get('passwordRepeat').value;
    
        if (password !== passwordRepeat) {
        control.get('passwordRepeat').setErrors({ NoPassswordMatch: true });
        }
    }
}