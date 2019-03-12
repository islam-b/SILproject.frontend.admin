import {MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatToolbarModule, MatIconModule]
})
export class MaterialModule {
}
