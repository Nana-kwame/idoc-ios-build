import { ExpandableHeaderComponent } from './../../components/expandable-header/expandable-header';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalsPage } from './hospitals';

@NgModule({
  declarations: [
    HospitalsPage,
    ExpandableHeaderComponent
  ],
  imports: [
    IonicPageModule.forChild(HospitalsPage),
  ],
})
export class HospitalsPageModule {}
