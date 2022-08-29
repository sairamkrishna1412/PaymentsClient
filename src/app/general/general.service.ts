import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private rootUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getIsLive(): Observable<any> {
    return this.http
      .get<any>(`${this.rootUrl}/status`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(() => err.message);
  }
}
