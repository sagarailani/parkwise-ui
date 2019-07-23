import { TestBed } from '@angular/core/testing';

import { PremiseService } from './premise.service';

describe('PremiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiseService = TestBed.get(PremiseService);
    expect(service).toBeTruthy();
  });
});
