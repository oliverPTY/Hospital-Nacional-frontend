import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const mockAuthService = {
    login: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate', () => {
    mockAuthService.login.mockReturnValue(of({}));

    component.form.setValue({
      username: 'admin',
      password: 'admin',
    });

    component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'admin');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set error when login fails', () => {
    mockAuthService.login.mockReturnValue(
      throwError(() => new Error('error'))
    );

    component.form.setValue({
      username: 'bad',
      password: 'bad',
    });

    component.login();

    expect(component.error()).toBe(true); // 🔥 signal
  });

  it('should reset error when form changes', async () => {
    component.error.set(true);

    component.form.patchValue({ username: 'test' });

    await new Promise(resolve => setTimeout(resolve, 5)); // debounceTime(1)

    expect(component.error()).toBe(false);
  });
});