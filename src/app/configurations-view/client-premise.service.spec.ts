import { TestBed } from '@angular/core/testing';

import { ClientPremiseService } from './client-premise.service';

describe('ClientPremiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientPremiseService = TestBed.get(ClientPremiseService);
    expect(service).toBeTruthy();
  });
});
