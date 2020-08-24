import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { IUser } from '../interfaces/iuser';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    const user = this.getUser();
    const ok = (user && user.Id?.length > 0) || false;
    if (!ok) {
      return this.router.navigate(['login']);
    }
    return true;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  clearSession() {
    //sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token_exp');
    sessionStorage.removeItem('token_iat');
    sessionStorage.removeItem('user');
    console.log('Removido Sessão, favor efetuar login novamente!');
    delay(500);
    this.router.navigate(['login']);
  }

  setToken(token: string): void {
    if (token.length > 0) {
      sessionStorage.setItem('token', token);
      const tokenDecoded: any = jwt_decode(token);
      if (tokenDecoded) {
        this.setUser({
          Id: tokenDecoded.userId,
          Name: tokenDecoded.name,
          Email: tokenDecoded.email,
        });
        sessionStorage.setItem('token_exp', tokenDecoded.exp);
        sessionStorage.setItem('token_iat', tokenDecoded.iat);
      }
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('token_exp');
      sessionStorage.removeItem('token_iat');
    }
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getTokenExpiration(): Date {
    const value = sessionStorage.getItem('token_exp');
    if (value.length > 0) {
      return new Date(Number(value) * 1000);
    } else {
      return null;
    }
  }

  setUser(user: IUser): void {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  getUser(): IUser {
    const userJson = sessionStorage.getItem('user');
    if (userJson != null && userJson != undefined && userJson.length > 2) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  login(email: string, password: string) {
    const objLogin = { email: email, password: password };

    return this.httpClient
      .post(`${environment.urlServices}/login`, objLogin, this.httpOptions)
      .pipe(
        tap((response: any) => {
          if (response.token.length > 0) {
            this.setToken(response.token);
          }
          return response;
        }),
        catchError((err) => this.handleError(err, 'login', objLogin))
      );
  }

  refreshToken() {
    return this.httpClient
      .get(`${environment.urlServices}/refreshtoken`, this.httpOptions)
      .pipe(
        tap((response: any) => {
          if (response.token.length > 0) {
            this.setToken(response.token);
          }
          return response;
        }),
        catchError((err) => this.handleError(err, 'refreshToken'))
      );
  }

  handleError(error: HttpErrorResponse, methodName?: string, data?: any) {
    let errorMessage = '';
    let errorStatus = 500;
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = error.message;
      errorStatus = error.status;
    }

    return throwError({
      method: methodName,
      status: errorStatus,
      message: errorMessage,
      data: data,
    });
  }
}
