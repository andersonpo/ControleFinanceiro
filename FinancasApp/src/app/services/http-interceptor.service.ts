import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    let newHeaders: HttpHeaders = req.headers;
    const token = this.authService.getToken();

    const requestToApi = req.url.startsWith(environment.urlServices);

    if (token != null && token.length > 0 && requestToApi) {
      newHeaders = newHeaders.set('Authorization', 'Bearer ' + token);

      this.updateToken(req.url);
    }

    const newRequest = req.clone({ headers: newHeaders });

    return next.handle(newRequest).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  updateToken(url: string) {
    const updateTokenXminutes = 10;
    const dateExpiration = this.authService.getTokenExpiration();
    const fakeExpiration = new Date(dateExpiration.getTime());
    fakeExpiration.setMinutes(
      dateExpiration.getMinutes() - updateTokenXminutes
    );

    const date = new Date();
    const diff = dateExpiration.getTime() - date.getTime();
    /*
    console.log(
      'token expiration',
      dateExpiration,
      'fake expiration',
      fakeExpiration
    );
    */

    if (!url.endsWith('/refreshtoken') && diff <= 0) {
      this.authService.refreshToken().subscribe(
        (newToken) => {
          console.log('http-interceptor.updateToken', newToken);
        },
        (err) => {
          if (err.status === 401) {
            this.authService.clearSession();
          } else {
            console.log('Erro ao atualizar o token', err);
          }
        }
      );
    }
  }
}
