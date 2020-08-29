import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/iuser';
import { UserItem } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: IUser = null;
  userItems: Array<UserItem>;
  title = 'FinancasApp';

  constructor(private authService: AuthService, private router: Router) {
    this.userItems = new Array<UserItem>();
    this.userItems.push({ text: 'Meus Dados', value: 'perfil' });
    this.userItems.push({ text: '', value: '', separator: true });
    this.userItems.push({ text: 'Sair', value: 'logout' });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      console.log('app rota', event);
      if (event instanceof NavigationEnd) {
        this.user = this.authService.getUser();
      }
    });
  }

  onTitleClick() {
    this.router.navigate(['/']);
  }

  onHeaderUserItemClick(item: UserItem) {
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

  saveSessionUrl() {
    const urlNow = this.router.url;
    let index = urlNow.indexOf(';');
    if (index > 0) {
      let url = urlNow.substring(0, index);
      let restOfUrl = urlNow.substring(index + 1);
      index = restOfUrl.indexOf('=');
      let paramName = restOfUrl.substring(0, index);
      restOfUrl = restOfUrl.substring(index + 1);
      let paramValue = restOfUrl.substring(0);

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
