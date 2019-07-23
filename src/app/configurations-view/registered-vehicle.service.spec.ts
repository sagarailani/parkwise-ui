import { TestBed } from '@angular/core/testing';

import { RegisteredVehicleService } from './registered-vehicle.service';

describe('RegisteredVehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteredVehicleService = TestBed.get(RegisteredVehicleService);
    expect(service).toBeTruthy();
  });
});
