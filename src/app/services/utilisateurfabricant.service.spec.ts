import { TestBed } from '@angular/core/testing';

import { UtilisateurfabricantService } from './utilisateurfabricant.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {Marque} from '../entities/Marque';
import {UtilisateurFabricant} from '../entities/UtilisateurFabricant';

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
  it(':getAllUsers() should get all users', () => {
    const mockRes: UtilisateurFabricant[] = [
      {
        IdUserF: 1,
        Mail: 'test@test.test',
        Nom: 'user',
        Prenom: 'user',
        Mdp: 'nopass',
        NumTel: '0612345678',
        Fabricant: 1,
        Valide: 1,
        Bloque: 0,
        marque: {NomMarque: 'marque1'},
        images: [{CheminImage: 'Path1'}]
      },
      {
        IdUserF: 2,
        Mail: 'test@test.test',
        Nom: 'user2',
        Prenom: 'user2',
        Mdp: 'nopass',
        NumTel: '0612345678',
        Fabricant: 2,
        Valide: 1,
        Bloque: 1,
        marque: {NomMarque: 'marque2'},
        images: [{CheminImage: 'Path2'}]
      }
    ];
    utilfabService.getAllUsers().subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'utilfab');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':getUser() should get the user', () => {
    const mockRes: UtilisateurFabricant = {
        IdUserF: 1,
        Mail: 'test@test.test',
        Nom: 'user',
        Prenom: 'user',
        Mdp: 'nopass',
        NumTel: '0612345678',
        Fabricant: 1,
        Valide: 1,
        Bloque: 0,
        marque: {NomMarque: 'marque1'},
        images: [{CheminImage: 'Path1'}]
      };
    utilfabService.getUser(1).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/utilfab/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':newUser() should create new user', () => {
    const body = {
      Mail: 'test@test.test',
      Nom: 'user',
      Prenom: 'user',
      NumTel: '0612345678',
      Fabricant: 5
    };
    const mockRes: UtilisateurFabricant = {
      IdUserF: 1,
      Mail: 'test@test.test',
      Nom: 'user',
      Prenom: 'user',
      Mdp: 'nopass',
      NumTel: '0612345678',
      Fabricant: 1,
      Valide: 0,
      Bloque: 0,
      marque: {NomMarque: 'marque1'},
      images: [{CheminImage: 'Path1'}]
    };
    utilfabService.newUser(body, 5).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/5/utilfab');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':updateUser() should update the user', () => {
    const body = {
      Mail: 'test@test.test',
      Nom: 'user',
      Prenom: 'user',
      NumTel: '0612345678',
      Fabricant: 5
    };
    const mockRes: UtilisateurFabricant = {
      IdUserF: 2,
      Mail: 'test@test.test',
      Nom: 'user',
      Prenom: 'user',
      Mdp: 'nopass',
      NumTel: '0612345678',
      Fabricant: 1,
      Valide: 0,
      Bloque: 0,
      marque: {NomMarque: 'marque1'},
      images: [{CheminImage: 'Path1'}]
    };
    utilfabService.updateUser(2, body).subscribe(data => {
      expect(data).toEqual(mockRes);
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'utilfab/2');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':setBlock() should lock/unlock the user\'s account', () => {
    const mockRes: UtilisateurFabricant = {
      IdUserF: 2,
      Mail: 'test@test.test',
      Nom: 'user',
      Prenom: 'user',
      Mdp: 'nopass',
      NumTel: '0612345678',
      Fabricant: 1,
      Valide: 0,
      Bloque: 1,
      marque: {NomMarque: 'marque1'},
      images: [{CheminImage: 'Path1'}]
    };
    utilfabService.setBlock(2,1).subscribe(data => {
      expect(data.Bloque).toEqual(1); //utilisateur bloque
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/utilfab/2/bloquer');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':deleteUser() should delete the user', () => {
    const mockRes = {
      message: 'Utilisateur supprime !'
    };
    utilfabService.deleteUser(5).subscribe(data => {
      expect(data.message).toEqual('Utilisateur supprime !');
    }, error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'marques/utilfab/5');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockRes);
    httpMock.verify();
  });
});
