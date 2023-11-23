import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPageComponent } from './turnos-page.component';

describe('TurnosPageComponent', () => {
  let component: TurnosPageComponent;
  let fixture: ComponentFixture<TurnosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosPageComponent]
    });
    fixture = TestBed.createComponent(TurnosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
