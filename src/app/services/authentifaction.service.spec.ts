import {getTestBed, inject, TestBed} from '@angular/core/testing';

import { AuthentificationService } from './authentifaction.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpEvent} from '@angular/common/http';
import {Router} from '@angular/router';

describe('AuthentificationService', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpMock: HttpTestingController;
  let authService: AuthentificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [AuthentificationService, {provide: Router, useValue: mockRouter}]
    });
    authService = TestBed.get(AuthentificationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AuthentificationService = TestBed.get(AuthentificationService);
    expect(service).toBeTruthy();
  });
  it(':isAuth should be none authentified before signing in', () => {
    if (!localStorage.getItem('administrateur')) {
    expect(authService.isAuth).toEqual(false); }
  });
  it(':signin() should sign in', () => {
    const mockUser = {Mail: 'test@test.test', Mdp: 'test'};
    const mockRes = {message: 'Authentification réussite !'};
    authService.signin(mockUser.Mail, mockUser.Mdp).subscribe(data => {
      expect(data.message).toEqual(mockRes.message);
    },error => {
      console.log(error);
    });
    const req = httpMock.expectOne(localStorage.getItem('baseUrl') + 'auth/admin');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRes);
    httpMock.verify();
  });
  it(':isAuth should be authentified after signing in', () => {
    if (localStorage.getItem('administrateur')) {
      expect(authService.isAuth).toEqual(true);
    } else {
      authService.setAuthentified('fakeAdmin');
      expect(authService.isAuth).toEqual(true);
      authService.signout();
    }
  });
  it(':signout should sign out', () => {
    if (localStorage.getItem('administrateur')) {
      authService.signout();
      expect(localStorage.getItem('administrateur')).toBeNull();
    }
  });
});
