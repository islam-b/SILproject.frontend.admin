import { TestBed } from '@angular/core/testing';

import { UtilisateurfabricantService } from './utilisateurfabricant.service';

describe('UtilisateurfabricantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilisateurfabricantService = TestBed.get(UtilisateurfabricantService);
    expect(service).toBeTruthy();
  });
});
