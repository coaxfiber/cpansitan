import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dev } from './dev';

@NgModule({
  declarations: [
    Dev,
  ],
  imports: [
    IonicPageModule.forChild(Dev),
  ],
  exports: [
    Dev
  ]
})
export class SearchModule {}
