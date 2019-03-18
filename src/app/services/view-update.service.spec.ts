import { TestBed } from '@angular/core/testing';

import { ViewUpdateService } from './view-update.service';

describe('ViewUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewUpdateService = TestBed.get(ViewUpdateService);
    expect(service).toBeTruthy();
  });
});
