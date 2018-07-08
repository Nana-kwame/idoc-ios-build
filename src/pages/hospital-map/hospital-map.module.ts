import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalMapPage } from './hospital-map';

@NgModule({
  declarations: [
    HospitalMapPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalMapPage),
  ],
})
export class HospitalMapPageModule {}
