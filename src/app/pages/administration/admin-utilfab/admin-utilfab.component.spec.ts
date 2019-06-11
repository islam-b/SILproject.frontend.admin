import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUtilfabComponent } from './admin-utilfab.component';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AdminUtilfabComponent', () => {
  let component: AdminUtilfabComponent;
  let fixture: ComponentFixture<AdminUtilfabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUtilfabComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUtilfabComponent);
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
  it( 'should have "Table Utilisateurs fabricants" component', () => {
    const childComponent = fixture.debugElement.query(By.css('app-table-utilisateurs-fabricants')).nativeElement;
    expect(childComponent).toBeTruthy();
  });
});
