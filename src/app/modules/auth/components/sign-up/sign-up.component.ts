import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserModel } from '../../models/user-model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public signupForm!: FormGroup;
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
    if(this.signupForm.valid) {
      const user: UserModel = this.signupForm.getRawValue();
      this.authService.signUp(user).subscribe((result) => {
        console.log(result);
        
        if(result) {
          this.router.navigate(['/auth/log-in'])
        }
      })
    }
  };

  public resetForm() {
    this.signupForm.reset();
  };

  public ngOnDestroy(): void {
    this.subscription.forEach((user) => {
      user.unsubscribe();
    })
  }

  private signUpReactiveForm(): void {
    this.signupForm = this.formBuilder.group({
      profile: [],
      passwords: [],
      favoriteFoods: []
    })
  };

}
