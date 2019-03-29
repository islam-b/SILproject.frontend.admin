import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {AdministrationRoutingModule} from '../../pages/administration/administration-routing.module';
import {BrowserModule, By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';;
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthGuard} from '../../services/guards/authentificationGuard';
import {AdminComponent} from '../../pages/administration/admin/admin.component';
import {AdminMarquesComponent} from '../../pages/administration/admin-marques/admin-marques.component';
import {AdminUtilfabComponent} from '../../pages/administration/admin-utilfab/admin-utilfab.component';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';



describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockRoute: any = { snapshot: {}};
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        MaterialModule
      ],
      declarations: [  SidenavComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        { provide: ActivatedRoute, useValue: mockRoute}
      ]
    })
      .compileComponents();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contains "Vue d\'ensemble (Gestion des marques)" link' , () => {
    const element = fixture.debugElement.query(By.css('#link1'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains "Nouvelle marque (Gestion des marques)" link' , () => {
    const element = fixture.debugElement.query(By.css('#link2'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains "Vue d\'ensemble (Gestion des utilisateurs)" link' , () => {
    const element = fixture.debugElement.query(By.css('#link3'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains "Nouvel Utilisateur (Gestion des utilisateurs)" link' , () => {
    const element = fixture.debugElement.query(By.css('#link4'));
    expect(element.nativeElement).toBeTruthy();
  });


  it(':Vue d\'ensemble (Gestion marques) should navigate to "Gestion marques"' , async(() => {
    const link = fixture.debugElement.query( By.css('#link3'));
    link.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(mockRouter).toHaveBeenCalledWith(['/admin/admin-marques']);
    });
  }));
  it(':Vue d\'ensemble (Gestion utilisateurs) should navigate to "Gestion utilisateurs"' , async(() => {
    const link = fixture.debugElement.query( By.css('#link3'));
    link.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {
      expect(mockRouter).toHaveBeenCalledWith(['/admin/admin-utilfab']);
    });
  }));
  it(':Nouvelle marque should open "Nouvelle marque" dialog' , () => {
    component.nouvelleMarque();
    expect(dialogSpy).toHaveBeenCalled();
  });
  it(':Nouvel utilisateur should open "Nouvel utilisateur" dialog' , () => {
    component.nouvelUtilisateur();
    expect(dialogSpy).toHaveBeenCalled();
  });

});
