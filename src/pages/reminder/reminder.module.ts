import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderPage } from './reminder';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    ReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderPage),
  ],
  providers: [
    LocalNotifications
  ]
})
export class ReminderPageModule {}
