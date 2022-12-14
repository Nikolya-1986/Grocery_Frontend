import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../../models/auth-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: AuthModel = {
    name: '',
    password: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public signUp() {
    this.authService.signUp(this.signUpForm).subscribe((result) => {
      if(result) {
        this.router.navigate(['/'])
      }
    })
  };

}
