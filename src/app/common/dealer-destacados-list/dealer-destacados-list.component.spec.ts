import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDestacadosListComponent } from './dealer-destacados-list.component';

describe('DealerDestacadosListComponent', () => {
  let component: DealerDestacadosListComponent;
  let fixture: ComponentFixture<DealerDestacadosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDestacadosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDestacadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
