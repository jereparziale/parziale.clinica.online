import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilPageComponent } from './mi-perfil-page.component';

describe('MiPerfilPageComponent', () => {
  let component: MiPerfilPageComponent;
  let fixture: ComponentFixture<MiPerfilPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiPerfilPageComponent]
    });
    fixture = TestBed.createComponent(MiPerfilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
