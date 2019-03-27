import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableMarquesComponent } from './table-marques.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('TableMarquesComponent', () => {
  let component: TableMarquesComponent;
  let fixture: ComponentFixture<TableMarquesComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
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
      providers: [{provide: Router, useValue: mockRouter}]
    }).compileComponents();
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
});
