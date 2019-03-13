import {MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule]
})
export class MaterialModule {
}
