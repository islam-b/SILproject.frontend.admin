import {MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule]
})
export class MaterialModule {
}
