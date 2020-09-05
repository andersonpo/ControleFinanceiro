import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
    if (user && user.Id?.length > 0) {
      this.router.navigate(['/home']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  login(formValue: any): void {
    this.authService.login(formValue.email, formValue.password).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Usuário ou Senha inválidos';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }
}
