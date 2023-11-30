import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPorPeriodoComponent } from './turnos-por-periodo.component';

describe('TurnosPorPeriodoComponent', () => {
  let component: TurnosPorPeriodoComponent;
  let fixture: ComponentFixture<TurnosPorPeriodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosPorPeriodoComponent]
    });
    fixture = TestBed.createComponent(TurnosPorPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
