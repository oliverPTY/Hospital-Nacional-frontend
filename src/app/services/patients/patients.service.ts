import { Injectable, isWritableSignal, signal, WritableSignal } from '@angular/core';
import { RequestService } from '../request/request.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../interface/request.interface';
import { Patient, RoomGroup } from '../../interface/patients.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
public patients: WritableSignal<Patient> = signal<Patient>({ data: [], total: 0, page: 0, totalPages: 0 });
  constructor(private readonly request: RequestService) {}

  public getRooms(): Observable<RoomGroup[]> {
    return this.request.request<ApiResponse<RoomGroup[]>>('GET', 'rooms').pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Error obteniendo rooms:', error);
        return throwError(() => new Error('No se pudieron obtener las salas'));
      }),
    );
  }

    public getRoomsUnits(roomId: string): Observable<RoomGroup> {
    return this.request.request<ApiResponse<RoomGroup>>('GET', `rooms/${roomId}`).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Error obteniendo rooms:', error);
        return throwError(() => new Error('No se pudieron obtener las salas'));
      }),
    );
  }

  public loadPatients(roomId: string, filters: any): Observable<Patient> {
    return this.request
      .request<ApiResponse<Patient>>('GET', `patients/${roomId}`, {
        params: filters,
      })
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          console.error('Error obteniendo pacientes:', error);
          return throwError(() => new Error('No se pudieron obtener los pacientes'));
        }),
      );
  }
}
