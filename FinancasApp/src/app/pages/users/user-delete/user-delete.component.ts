import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent implements OnInit {
  id = '';
  user: IUser = null;
  errorMessage = '';

  constructor(
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
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(
      (response) => {
        this.user = response.result;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Falha ao recuperar os dados do usuário.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }

  btnCancel(): void {
    this.router.navigate(['/user']);
  }

  btnConfirm(): void {
    this.userService.delete(this.id).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/user']);
      },
      (error) => {
        this.errorMessage = 'Falha ao excluir o usuário.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }
}
