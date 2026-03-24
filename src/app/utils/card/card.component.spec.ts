import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('patients', {
      id: '1',
      fullName: 'Juan Pérez',
      age: 30,
      gender: 'M',
      doctorId: 'doc-1',
      diagnosis: 'Test',
      instructions: [],
      room: 'uci',
      status: 'estable',
      bed: 'UCI-1',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});