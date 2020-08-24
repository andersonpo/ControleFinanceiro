import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  createForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  btnVoltar() {
    this.router.navigate(['/user']);
  }

  btnSalvar(formValue: any) {
    this.userService.create(formValue).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/user']);
      },
      (error) => {
        this.errorMessage = 'Verifique os dados informados e tente novamente.';
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }
}
