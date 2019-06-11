import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableUtilisateursBloquesComponent } from './table-utilisateurs-bloques.component';

describe('TableUtilisateursBloquesComponent', () => {
  let component: TableUtilisateursBloquesComponent;
  let fixture: ComponentFixture<TableUtilisateursBloquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUtilisateursBloquesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUtilisateursBloquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
