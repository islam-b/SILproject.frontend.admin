import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatCardModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule, MatSortModule,
    MatProgressSpinnerModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule, MatSortModule,
    MatProgressSpinnerModule, MatDialogModule]
})
export class MaterialModule {
}
