import { TestBed } from '@angular/core/testing';

import { AuthentifactionService } from './authentifaction.service';

describe('AuthentifactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthentifactionService = TestBed.get(AuthentifactionService);
    expect(service).toBeTruthy();
  });
});
