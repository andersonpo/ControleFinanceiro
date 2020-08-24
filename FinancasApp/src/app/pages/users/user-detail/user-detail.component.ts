import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  id: string = '';
  user: IUser = null;
  errorMessage: string = '';

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
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }

  btnBack() {
    this.router.navigate(['/user']);
  }
}
