import { Component, computed, effect, inject } from '@angular/core';
import { CardComponent } from '../../utils/card/card.component';
import { PatientsService } from '../../services/patients/patients.service';
import { PacientItems } from '../../interface/patients.interface';

@Component({
  selector: 'app-patients',
  imports: [CardComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  private readonly patientsService = inject(PatientsService);
  public patients = computed(() => this.patientsService.patients().data);
}
