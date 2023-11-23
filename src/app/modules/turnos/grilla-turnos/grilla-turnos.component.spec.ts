import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaTurnosComponent } from './grilla-turnos.component';

describe('GrillaTurnosComponent', () => {
  let component: GrillaTurnosComponent;
  let fixture: ComponentFixture<GrillaTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrillaTurnosComponent]
    });
    fixture = TestBed.createComponent(GrillaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
