import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatCardModule, MatTableModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatTableModule]
})
export class MaterialModule {
}
