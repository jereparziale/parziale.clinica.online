import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosPageComponent } from './mis-turnos-page.component';

describe('MisTurnosPageComponent', () => {
  let component: MisTurnosPageComponent;
  let fixture: ComponentFixture<MisTurnosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisTurnosPageComponent]
    });
    fixture = TestBed.createComponent(MisTurnosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
