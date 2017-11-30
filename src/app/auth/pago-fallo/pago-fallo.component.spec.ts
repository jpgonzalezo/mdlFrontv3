import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFalloComponent } from './pago-fallo.component';

describe('PagoFalloComponent', () => {
  let component: PagoFalloComponent;
  let fixture: ComponentFixture<PagoFalloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoFalloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFalloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
