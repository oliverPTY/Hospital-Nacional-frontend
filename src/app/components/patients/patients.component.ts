import { Component, computed, effect, inject, signal } from '@angular/core';
import { CardComponent } from '../../utils/card/card.component';
import { PatientsService } from '../../services/patients/patients.service';
import { PaginatorComponent } from '../../utils/paginator/paginator.component';

@Component({
  selector: 'app-patients',
  imports: [CardComponent, PaginatorComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  public readonly patientsService = inject(PatientsService);
  public patients = computed(() => this.patientsService.patients().data);
  public page = computed(() => this.patientsService.patients().page);
  public totalPages = computed(() => this.patientsService.patients().totalPages);

  onPageChange(page: number) {
  this.patientsService.changePage(page);
}
}
