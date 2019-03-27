import { TestBed } from '@angular/core/testing';

import { UtilisateurfabricantService } from './utilisateurfabricant.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router} from '@angular/router';

describe('UtilisateurfabricantService', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpMock: HttpTestingController;
  let utilfabService: UtilisateurfabricantService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [UtilisateurfabricantService, {provide: Router, useValue: mockRouter}]
    });
    utilfabService = TestBed.get(UtilisateurfabricantService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    const service: UtilisateurfabricantService = TestBed.get(UtilisateurfabricantService);
    expect(service).toBeTruthy();
  });
});
