import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleMarqueComponent } from './nouvelle-marque.component';

describe('NouvelleMarqueComponent', () => {
  let component: NouvelleMarqueComponent;
  let fixture: ComponentFixture<NouvelleMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
