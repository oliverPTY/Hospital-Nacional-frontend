import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { PatientsService } from '../../services/patients/patients.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

const mockPatientsService = {
  getRooms: vi.fn().mockReturnValue(of([{ id: 'uci' }])),
  getRoomsUnits: vi.fn().mockReturnValue(of({ rooms: ['UCI-1'] })),
  loadPatients: vi.fn().mockReturnValue(
    of({ data: [], totalPages: 1 })
  ),
  patients: {
    set: vi.fn(),
  },
  loading: {
    set: vi.fn(),
  },
};

const mockDoctorService = {
  getDoctors: vi.fn().mockReturnValue(of([])),
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        { provide: PatientsService, useValue: mockPatientsService },
        { provide: DoctorService, useValue: mockDoctorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('room')).toBeTruthy();
    expect(component.form.get('search')).toBeTruthy();
  });

  it('should load rooms on init', () => {
    expect(mockPatientsService.getRooms).toHaveBeenCalled();
  });

  it('should set initial room from service', () => {
    expect(component.form.value.room).toBe('uci');
  });

it('should call loadPatients on form change', () => {
  const spy = vi.spyOn(component as any, 'loadPatients');
  component.form.patchValue({ search: 'test' });
  expect(spy).toHaveBeenCalled();
});

it('should call getRoomsUnits when room changes', async () => {
  component.form.get('room')?.setValue('uci');
  await new Promise(resolve => setTimeout(resolve, 250));
  expect(mockPatientsService.getRoomsUnits).toHaveBeenCalledWith('uci');
});

  it('should set loading when loading patients', () => {
    component['loadPatients']({ room: 'uci' });
    expect(mockPatientsService.loading.set).toHaveBeenCalledWith(true);
  });

it('should update patients on load', async () => {
  component['loadPatients']({ room: 'uci' });
  await new Promise(resolve => setTimeout(resolve, 900));
  expect(mockPatientsService.patients.set).toHaveBeenCalled();
});

  it('should load doctors on init', () => {
    expect(mockDoctorService.getDoctors).toHaveBeenCalled();
  });
});