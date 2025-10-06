import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestosDeshabilitadosComponent } from './repuestos-deshabilitados.component';

describe('RepuestosDeshabilitadosComponent', () => {
  let component: RepuestosDeshabilitadosComponent;
  let fixture: ComponentFixture<RepuestosDeshabilitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepuestosDeshabilitadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepuestosDeshabilitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
