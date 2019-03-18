import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { TableUtilisateursFabricantsComponent } from './table-utilisateurs-fabricants.component';

describe('TableUtilisateursFabricantsComponent', () => {
  let component: TableUtilisateursFabricantsComponent;
  let fixture: ComponentFixture<TableUtilisateursFabricantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUtilisateursFabricantsComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUtilisateursFabricantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
