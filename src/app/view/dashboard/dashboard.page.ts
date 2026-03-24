import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchComponent } from '../../components/search/search.component';
import { PatientsComponent } from '../../components/patients/patients.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard.page',
  imports: [NavbarComponent, SearchComponent, PatientsComponent, FooterComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {}
