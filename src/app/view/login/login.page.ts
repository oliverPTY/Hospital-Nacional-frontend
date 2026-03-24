import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.page',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  public form!: FormGroup;
  public error = signal(false);
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
    this.listenFormChanges();
  }

  public login(): void {
    this.authService.login(this.form.value.username, this.form.value.password).subscribe({
      next: (res) => this.router.navigate(['/dashboard']),
      error: () => this.error.set(true),
    });
  }

  private listenFormChanges(): void {
    this.form.valueChanges.pipe(debounceTime(1)).subscribe((filters) => {
      this.error.set(false);
    });
  }
}
