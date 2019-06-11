import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarquesComponent } from './admin-marques.component';
import {TableMarquesComponent} from '../../../components/table-marques/table-marques.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule, By} from '@angular/platform-browser';
import {MatDialog, MatTableModule} from '@angular/material';

describe('AdminMarquesComponent', () => {
  let component: AdminMarquesComponent;
  let fixture: ComponentFixture<AdminMarquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMarquesComponent ],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'should have a title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title).toBeTruthy();
    expect(title.textContent).toEqual('Vue d\'ensemble');
  });
  it( 'should have "Table Marques" component', () => {
    const childComponent = fixture.debugElement.query(By.css('app-table-marques')).nativeElement;
    expect(childComponent).toBeTruthy();
  });

});
