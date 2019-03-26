import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {By} from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contains the logo', () => {
    const element = fixture.debugElement.query(By.css('#logo'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains the links', () => {
    const element = fixture.debugElement.queryAll(By.css('.lien'));
    expect(element.length).toEqual(5);
  });
  it('should contains the contact info section', () => {
    const element = fixture.debugElement.query(By.css('.info'));
    expect(element.nativeElement).toBeTruthy();
  });
  it('should contains social medial links (facebook, linkedin, twitter)', () => {
    const element = fixture.debugElement.queryAll(By.css('.social-m'));
    expect(element.length).toEqual(3);
  });
});
