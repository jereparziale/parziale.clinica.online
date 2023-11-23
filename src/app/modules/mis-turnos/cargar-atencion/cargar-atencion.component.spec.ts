import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAtencionComponent } from './cargar-atencion.component';

describe('CargarAtencionComponent', () => {
  let component: CargarAtencionComponent;
  let fixture: ComponentFixture<CargarAtencionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarAtencionComponent]
    });
    fixture = TestBed.createComponent(CargarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
