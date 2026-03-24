import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../interface/request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly request: RequestService) {}

  public login(username: string, password: string): Observable<any> {
    return this.request
      .request<ApiResponse<any>>('POST', 'auth/login', {
        body: { username, password },
      })
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          console.error('Error al hacer login', error);
          return throwError(() => new Error('No se pudo hacer login'));
        }),
      );
  }
}
