import { Component, input, InputSignal } from '@angular/core';
import { PacientItems } from '../../interface/patients.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public patients: InputSignal<PacientItems> = input.required();

  public getGender(id: string): string {
    return id === 'M' ? 'Masculino' : 'Femenino'
  }
}
