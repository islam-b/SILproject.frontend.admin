import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCompteComponent } from './confirmation-compte.component';

describe('ConfirmationCompteComponent', () => {
  let component: ConfirmationCompteComponent;
  let fixture: ComponentFixture<ConfirmationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
