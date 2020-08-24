import { Component, OnInit } from '@angular/core';
import { IUser } from './../../interfaces/iuser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUser = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  btnUsersClick() {
    this.router.navigate(['user']);
  }
}
