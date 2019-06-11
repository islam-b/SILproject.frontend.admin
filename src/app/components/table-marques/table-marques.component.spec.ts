import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

import { TableMarquesComponent } from './table-marques.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('TableMarquesComponent', () => {
  let component: TableMarquesComponent;
  let fixture: ComponentFixture<TableMarquesComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMarquesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [{provide: Router, useValue: mockRouter}],

    }).compileComponents();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  it('should contains the search input', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains "Nouvelle marque" button', () => {
    const element = fixture.debugElement.query(By.css('button'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the table', () => {
    const element = fixture.debugElement.query(By.css('table'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the progess spinner', () => {
    const element = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the table paginator', () => {
    const element = fixture.debugElement.query(By.css('mat-paginator'));
    expect(element.nativeElement).toBeTruthy();
  });
  it(':Nouvelle marque should open "Nouvelle marque" dialog' , () => {
    component.nouvelleMarque();
    expect(dialogSpy).toHaveBeenCalled();
  });
  it(':Nouvel utilisateur (icone) should open "Nouvel utilisateur" dialog' , (done) => {
    const link = fixture.debugElement.queryAll(By.css('.newuser'));
    expect(link).not.toBeNull();
    // link.triggerEventHandler('click', {});
    fixture.whenStable().then(() => {

      expect(component.nouvelUtilisateur).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalled();
      done();
    });
  });
  it(':Modifier marque (icone) should open "Modifier marque" dialog' , () => {
      const link = fixture.debugElement.query(By.css('.mat-column-Gestion img:nth-child(1)')).nativeElement;
      link.click();
      expect(component.modifierMarque).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalled();
  });
  it(':Supprimer marque (icone) should open "Supprimer marque" dialog' ,() => {

      const link = fixture.debugElement.nativeElement.query(By.css('.delete-mark')).nativeElement;
      link.click();
      expect(component.supprimerMarque).toHaveBeenCalled();
      expect(dialogSpy).toHaveBeenCalled();

  });


});
