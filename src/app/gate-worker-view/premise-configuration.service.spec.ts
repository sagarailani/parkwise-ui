import { TestBed } from '@angular/core/testing';

import { PremiseConfigurationService } from './premise-configuration.service';

describe('PremiseConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiseConfigurationService = TestBed.get(PremiseConfigurationService);
    expect(service).toBeTruthy();
  });
});
