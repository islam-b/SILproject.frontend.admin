import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatCardModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule]
})
export class MaterialModule {
}
