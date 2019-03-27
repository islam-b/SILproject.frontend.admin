import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableUtilisateursFabricantsComponent } from './table-utilisateurs-fabricants.component';
import {TableMarquesComponent} from '../table-marques/table-marques.component';
import {MaterialModule} from '../../material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('TableUtilisateursFabricantsComponent', () => {
  let component: TableUtilisateursFabricantsComponent;
  let fixture: ComponentFixture<TableUtilisateursFabricantsComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUtilisateursFabricantsComponent],
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
      providers: [{provide: Router, useValue: mockRouter}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUtilisateursFabricantsComponent);
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
});
