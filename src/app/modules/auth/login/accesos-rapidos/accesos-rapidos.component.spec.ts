import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesosRapidosComponent } from './accesos-rapidos.component';

describe('AccesosRapidosComponent', () => {
  let component: AccesosRapidosComponent;
  let fixture: ComponentFixture<AccesosRapidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesosRapidosComponent]
    });
    fixture = TestBed.createComponent(AccesosRapidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
