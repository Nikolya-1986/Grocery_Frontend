import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthModel } from '../../models/auth-model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as validators from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public formSignUp!: FormGroup;
  private subscription: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.signUpReactiveForm();
  }

  public onSubmit(): void {
    if(this.formSignUp.valid) {
      const user: AuthModel = this.formSignUp.getRawValue();
      this.authService.signUp(user).subscribe((result) => {
        if(result) {
          this.router.navigate(['/auth/log-in'])
        }
      })
    }
  };

  public ngOnDestroy(): void {
    this.subscription.forEach((user) => {
      user.unsubscribe();
    })
  }

  private signUpReactiveForm(): void {
    this.formSignUp = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      passwordRepeat: [''],
    },
      { validator: validators.PasswordMatchValidator.passwordMatchValidator }
    )
  };



}
