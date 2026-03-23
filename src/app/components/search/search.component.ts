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
  form!: FormGroup;
  rooms: RoomGroup[] = [];
  doctors: Doctor[] = [];
  roomsType: string[] | null = null;
  patients: any[] = [];
  loading = false;
  total = 0;
  page = 1;
  limit = 12;
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
          room: res[0].id
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
          this.patientsService.patients.set(res);
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
