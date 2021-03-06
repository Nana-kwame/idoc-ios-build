import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import * as moment from 'moment';
/**
 * Generated class for the ReminderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//LAUNCHING AND SAVING THE REMINDER NOTIFICATIOn

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;
  message:any

  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications, public viewCtrl: ViewController) {

    this.notifyTime = moment(new Date()).format();

    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      { title: 'Monday', dayCode: 1, checked: false },
      { title: 'Tuesday', dayCode: 2, checked: false },
      { title: 'Wednesday', dayCode: 3, checked: false },
      { title: 'Thursday', dayCode: 4, checked: false },
      { title: 'Friday', dayCode: 5, checked: false },
      { title: 'Saturday', dayCode: 6, checked: false },
      { title: 'Sunday', dayCode: 0, checked: false }
    ]
  
  this.message = JSON.parse(localStorage.getItem('message'))
  console.log('Message ', this.message);
  }

  ionViewDidLoad() {

  }

  timeChange(time) {
    //SETS THE HOUR AND MINUTE ACCORDING TO THE FORM VALUE
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  addNotifications() {
    //ADDING A NEW NOTIFICATIOn

    let currentDate = new Date();
    let currentDay = currentDate.getDay();

    //LOOP THROUGH THE DAYS ARRAY & CHECK THE DAYCODE, IF IT IS A NEGATIVE VALUE FROM THE DIFFERENCE ADD 7 TO INDICATE SWITCHED TO NEXT WEEK
    for (let day of this.days) {
      if (day.checked) {

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if (dayDifference < 0) {
          dayDifference = dayDifference + 7;
        }

        firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        firstNotificationTime.setHours(this.chosenHours);
        firstNotificationTime.setMinutes(this.chosenMinutes);


        let notification = {
          id: day.dayCode,
          title: 'Reminder',
          text: this.message.message,
          at: firstNotificationTime,
          every: 'week'
        };

        this.notifications.push(notification)
      }
    }
    console.log("Notifications to be scheduled: ", this.notifications);
    let alert = this.alertCtrl.create({

      title: 'Notifcaitions set',
      buttons: ['Ok']
    });

    alert.present();
    this.onDismiss();

    //FOR PHONE LAUNCHES
    if (this.platform.is('corodova')) {

      //Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {

        //Schedule the new  notifications
        this.localNotifications.schedule(this.notifications);

        this.notifications = [];

        let alert = this.alertCtrl.create({

          title: 'Notifcaitions set',
          buttons: ['Ok']
        });

        alert.present();
      })

    }
  }

  cancelAll() {

    this.localNotifications.cancelAll();

    let alert = this.alertCtrl.create({
      title: 'Notifications cancelled',
      buttons: ['Ok']
    });

    alert.present();
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }
}