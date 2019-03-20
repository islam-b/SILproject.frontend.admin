import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule, MatSortModule,
    MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule, MatSortModule,
    MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, MatSlideToggleModule]
})
export class MaterialModule {
}
