import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerMarqueComponent } from './supprimer-marque.component';

describe('SupprimerMarqueComponent', () => {
  let component: SupprimerMarqueComponent;
  let fixture: ComponentFixture<SupprimerMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
