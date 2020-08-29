import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id: string = '';
  user: any = null;
  errorMessage: string = '';
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      if (this.id.length <= 0) {
        console.log('User ID não informado!');
        this.router.navigate(['/user']);
      }
    });

    this.updateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(
      (response) => {
        this.user = response.result;
        this.errorMessage = '';

        this.updateForm.controls['name'].setValue(this.user.Name);
        this.updateForm.controls['email'].setValue(this.user.Email);
      },
      (error) => {
        this.errorMessage = 'Falha ao recuperar os dados do usuário.';
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }

  btnBack() {
    this.router.navigate(['/user']);
  }

  updateUser(data) {
    this.userService.update(this.id, data).subscribe(
      (response) => {
        this.errorMessage = '';
        this.user = response.result;
        this.router.navigate(['/user']);
      },
      (error) => {
        this.errorMessage = 'Falha ao atualizar o usuário.';
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }
}