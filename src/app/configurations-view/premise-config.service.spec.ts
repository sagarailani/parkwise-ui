import { TestBed } from '@angular/core/testing';

import { PremiseConfigService } from './premise-config.service';

describe('PremiseConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiseConfigService = TestBed.get(PremiseConfigService);
    expect(service).toBeTruthy();
  });
});
