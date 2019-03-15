import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableMarquesComponent } from './table-marques.component';

describe('TableMarquesComponent', () => {
  let component: TableMarquesComponent;
  let fixture: ComponentFixture<TableMarquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMarquesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
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
});
