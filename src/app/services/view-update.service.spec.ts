import { TestBed } from '@angular/core/testing';

import { ViewUpdateService } from './view-update.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

describe('ViewUpdateService', () => {
  let mockRouter = {
  navigate: jasmine.createSpy('navigate')
  };
  let viewUpdateService: ViewUpdateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ViewUpdateService, {provide: Router, useValue: mockRouter}]
    });
    viewUpdateService = TestBed.get(ViewUpdateService);
  });

  it('should be created', () => {
    const service: ViewUpdateService = TestBed.get(ViewUpdateService);
    expect(service).toBeTruthy();
  });
});
