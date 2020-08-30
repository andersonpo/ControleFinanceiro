import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  list(): Observable<any> {
    return this.httpClient.get(
      `${environment.urlServices}/users`,
      this.httpOptions
    );
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.urlServices}/users/${id}`,
      this.httpOptions
    );
  }

  create(data): Observable<any> {
    return this.httpClient.post(
      `${environment.urlServices}/users`,
      data,
      this.httpOptions
    );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.urlServices}/users/${id}`,
      this.httpOptions
    );
  }

  update(id: string, data): Observable<any> {
    return this.httpClient.put(
      `${environment.urlServices}/users/${id}`,
      data,
      this.httpOptions
    );
  }

  uploadPhoto(id: string, photo): Observable<any> {
    return this.httpClient.post(
      `${environment.urlServices}/users/${id}/photo`,
      photo
    );
  }
}
