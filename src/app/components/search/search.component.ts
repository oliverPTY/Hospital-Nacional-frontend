import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient, RoomGroup } from '../../interface/patients.interface';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../interface/doctor.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public form!: FormGroup;
  public rooms: RoomGroup[] = [];
  public doctors: Doctor[] = [];
  public roomsType: string[] | null = null;
  public patients: any[] = [];
  public loading = false;
  public totalPages = 1;
  public page = 1;
  public limit = 9;
  constructor(
    private readonly fb: FormBuilder,
    private readonly patientsService: PatientsService,
    private readonly doctorService: DoctorService,
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      room: [null],
      search: [''],
      doctor: [''],
      bed: [''],
      status: [''],
      sort: [''],
    });
    this.listenRoomChanges();
    this.listenFormChanges();
    this.loadRooms();
    this.loadDoctors();
  }

  private listenRoomChanges(): void {
    this.form
      .get('room')
      ?.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((room) => this.patientsService.getRoomsUnits(room)),
      )
      .subscribe((res) => {
        this.roomsType = res.rooms;
        this.form.patchValue({ bed: '' }, { emitEvent: false });
      });
  }

  private listenFormChanges(): void {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((filters) => {
      this.loadPatients(filters);
    });
  }

  private loadRooms(): void {
    this.patientsService.getRooms().subscribe({
      next: (res: RoomGroup[]) => {
        this.rooms = res;
        if (res.length) {
          this.form.patchValue({
            room: res[0].id,
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  private loadPatients(filters: any): void {
    const { room, ...query } = filters;
    this.loading = true;
    this.patientsService
      .loadPatients(room, {
        ...query,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (res: Patient) => {
          this.patients = res.data;
          this.totalPages = res.totalPages;
          this.patientsService.patients.set({
            ...res,
            room,
            filters: query,
            limit: this.limit,
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (res: Doctor[]) => {
        this.doctors = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
