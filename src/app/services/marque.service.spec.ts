import { TestBed } from '@angular/core/testing';

import { MarqueService } from './marque.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthentificationService} from './authentifaction.service';
import {Router} from '@angular/router';
import {Marque} from '../entities/Marque';

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
  it(':getAllMarques() should get all marks', () => {
    const mockRes: Marque[] = [
      {
        CodeMarque: '1234',
        NomMarque: 'marque1',
        images: [{CheminImage: 'Path1'}]
      },
      {
        CodeMarque: '1235',
        NomMarque: 'marque2',
        images: [{CheminImage: 'Path2'}]
      }
      ];
    marqueService.getAllMarques().subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':getMarque() should get the mark', () => {
    const mockRes: Marque = {
        CodeMarque: '1234',
        NomMarque: 'marque1',
        images: [{CheminImage: 'Path1'}]
      };
    marqueService.getMarque(1234).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/1234');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':newMarque() should create a new mark', () => {
    const mockRes = {
      CodeMarque: '1234',
      NomMarque: 'marque1'
    };
    marqueService.newMarque(mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':editMarque() should update the mark', () => {
    const mockRes = {
      CodeMarque: '1234',
      NomMarque: 'marque2'
    };
    marqueService.editMarque(mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/1234');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':deleteMarque() should delete the mark', () => {
    const mockRes = {
      message: 'Marque supprimee !'
    };
    marqueService.deleteMarque(1234).subscribe(data => {
      expect(data.message).toEqual('Marque supprimee !');
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/1234');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockRes);
    httpMock.verify();
  });
});
