import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUtilfabComponent } from './admin-utilfab.component';

describe('AdminUtilfabComponent', () => {
  let component: AdminUtilfabComponent;
  let fixture: ComponentFixture<AdminUtilfabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUtilfabComponent ]
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
});
