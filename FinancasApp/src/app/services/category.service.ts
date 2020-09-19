import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  list(pageIndex: number, pageSize: number = 10): Observable<any> {
    const httpOptionsPaginated = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('pageIndex', pageIndex.toString()).set('pageSize', pageSize.toString())
    };
    return this.httpClient.get(
      `${environment.urlServices}/category`,
      httpOptionsPaginated
    );
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.urlServices}/category/${id}`,
      this.httpOptions
    );
  }

  create(data): Observable<any> {
    return this.httpClient.post(
      `${environment.urlServices}/category`,
      data,
      this.httpOptions
    );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.urlServices}/category/${id}`,
      this.httpOptions
    );
  }

  update(id: string, data): Observable<any> {
    return this.httpClient.put(
      `${environment.urlServices}/category/${id}`,
      data,
      this.httpOptions
    );
  }
}
