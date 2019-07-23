import { TestBed } from '@angular/core/testing';

import { GateService } from './gate.service';

describe('GateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GateService = TestBed.get(GateService);
    expect(service).toBeTruthy();
  });
});
