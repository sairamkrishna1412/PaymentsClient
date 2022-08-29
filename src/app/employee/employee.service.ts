import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private rootUrl = 'http://localhost:8081';
  private _userData : object = {};

  get userData():object{
    return this._userData;
  }
  set userData(data:object){
    this._userData = data;
  }
  
  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http
      .get<any>(`${this.rootUrl}/emp/getMe`, {withCredentials : true})
      .pipe(catchError(this.handleError));
  }

  transferCtc(form: any): Observable<any> {
    console.log(form, typeof form);
    return this.http
          .post<any>(`${this.rootUrl}/emp/transfer/ctc`, {...form},{withCredentials : true})
          .pipe(catchError(this.handleError));
  }

  getIsLive(): Observable<any> {
    return this.http
      .get<any>(`${this.rootUrl}/status`)
      .pipe(catchError(this.handleError));
  }

  loginUser(form: any): Observable<any> {
    console.log(form, typeof form);
    return this.http
          .post<any>(`${this.rootUrl}/login`, {username : form.username, password : form.password})
          .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(() => err.message);
  }
}
