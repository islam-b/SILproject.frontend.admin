import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AdministrationModule} from '../../pages/administration/administration.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {AdministrationRoutingModule} from '../../pages/administration/administration-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';

import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthGuard} from '../../services/guards/authentificationGuard';
import {Subject} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
 //https://stackoverflow.com/questions/39791773/angular-2-4-6-7-unit-testing-with-router
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ HeaderComponent ],
      providers: [{provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contains the logo', () => {
    const element = fixture.debugElement.query(By.css('#logo'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the logout button', () => {
    const element = fixture.debugElement.query(By.css('button'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the search form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should logout when clicking on logout button', () => {
    const save = localStorage.getItem('administrateur');
    if (save === undefined) {
      localStorage.setItem('administrateur', 'this is a connexion test');
    }
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    const newItem = localStorage.getItem('administrateur');
    localStorage.setItem('administrateur', save);
    expect(newItem).toBeFalsy();
  });
});
