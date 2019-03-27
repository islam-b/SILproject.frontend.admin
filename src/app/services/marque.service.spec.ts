import { TestBed } from '@angular/core/testing';

import { MarqueService } from './marque.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthentificationService} from './authentifaction.service';
import {Router} from '@angular/router';

describe('MarqueService', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpMock: HttpTestingController;
  let marqueService: MarqueService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [MarqueService, {provide: Router, useValue: mockRouter}]
    });
    marqueService = TestBed.get(MarqueService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: MarqueService = TestBed.get(MarqueService);
    expect(service).toBeTruthy();
  });
});
