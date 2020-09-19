import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/iuser';
import { UserItem } from './components/header/header.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userToken: IUser = null;
  user: IUser = null;
  userItems: Array<UserItem>;
  title = 'FinancasApp';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.userItems = new Array<UserItem>();
    this.userItems.push({ text: 'Meus Dados', value: 'perfil' });
    this.userItems.push({ text: '', value: '', separator: true });
    this.userItems.push({ text: 'Sair', value: 'logout' });
  }

  ngOnInit(): void {
    this.updateUser();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUser();
      }
    });
  }

  private updateUser(): void {
    this.userToken = this.authService.getUser();
    this.userService.findById(this.userToken?.Id).subscribe((value) => {
      this.user = value.result;
    });
  }

  onTitleClick(): void {
    this.router.navigate(['/']);
  }

  onHeaderUserItemClick(item: UserItem): void {
    switch (item.value) {
      case 'logout':
        this.authService.clearSession();
        break;
      case 'perfil':
        this.saveSessionUrl();
        this.router.navigate(['user/edit', { id: this.user.Id }]);
        break;

      default:
        break;
    }
  }

  saveSessionUrl(): void {
    const urlNow = this.router.url;
    let index = urlNow.indexOf(';');
    if (index > 0) {
      const url = urlNow.substring(0, index);
      let restOfUrl = urlNow.substring(index + 1);
      index = restOfUrl.indexOf('=');
      const paramName = restOfUrl.substring(0, index);
      restOfUrl = restOfUrl.substring(index + 1);
      const paramValue = restOfUrl.substring(0);

      const objParams = {};
      objParams[paramName] = paramValue;

      sessionStorage.setItem('url', url);
      sessionStorage.setItem('urlParams', JSON.stringify(objParams));
      return;
    }
    sessionStorage.setItem('url', urlNow);
    sessionStorage.removeItem('urlParams');
  }
}
