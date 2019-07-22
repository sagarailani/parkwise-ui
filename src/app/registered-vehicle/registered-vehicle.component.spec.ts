import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredVehicleComponent } from './registered-vehicle.component';

describe('RegisteredVehicleComponent', () => {
  let component: RegisteredVehicleComponent;
  let fixture: ComponentFixture<RegisteredVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
