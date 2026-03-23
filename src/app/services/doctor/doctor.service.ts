import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../interface/request.interface';
import { Doctor } from '../../interface/doctor.interface';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private readonly request: RequestService) {}
  public getDoctors(): Observable<Doctor[]> {
    return this.request.request<ApiResponse<Doctor[]>>('GET', `doctor`).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Error obteniendo pacientes:', error);
        return throwError(() => new Error('No se pudieron obtener los pacientes'));
      }),
    );
  }
}
