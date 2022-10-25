import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MaterialComponents = [
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule
]
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
