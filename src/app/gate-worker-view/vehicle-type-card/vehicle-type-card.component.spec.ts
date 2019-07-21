import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCardComponent } from './vehicle-type-card.component';

describe('VehicleTypeCardComponent', () => {
  let component: VehicleTypeCardComponent;
  let fixture: ComponentFixture<VehicleTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
