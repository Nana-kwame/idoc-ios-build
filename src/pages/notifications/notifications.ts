import { CacheService } from 'ionic-cache';
import { LoginPage } from './../login/login';
import { Message } from './../../models/message';
import { User } from './../../models/user';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ReminderPage } from '../reminder/reminder';
import { SignupPage } from '../signup/signup';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/interval';
import "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/mergeMapTo';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage implements OnInit {

  loginParams: { token: string, user: User }
  //notifications:{success:boolean, message: Message};
  notifications: any[] = [];

  newNots: any[] = [];
  deletedNots: any[] = [];
  text: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private cache: CacheService,
    public http: Http) {
    this.loginParams = this.navParams.get('loginParams')

    console.log(this.loginParams);
  }

  ionViewDidLoad() {

  }

  ngOnInit(): void {
    if (this.loginParams != undefined) {
      this.getNotifications()
    }

    if (this.newNots.length == 0) {
      this.text = "Sorry you have no messages at this moment"
      console.log("The bloogy text ", this.text);

    }

  }


  getNotifications() {
    let hosID = this.loginParams.user.hosID
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    setInterval(() => {
      this.http.get("https://secure-cliffs-90491.herokuapp.com/userNotifications/" + hosID, { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {
            this.notifications = data.message
            this.newNots = this.notifications
            console.log("Notifications data ", this.notifications);
            console.log('Filtered notifcation ', this.newNots);          
            //this.presentToast()
          }
        )
        localStorage.setItem("hosID", JSON.stringify(hosID))
        localStorage.setItem(`${hosID}`, JSON.stringify(this.newNots.length))
    }, 10000);
  }

  



  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Messages loaded',
      duration: 2000
    });

    toast.present();
  }


  onDelete(msg: any) {
    let hosID = this.loginParams.user.hosID

    const index: number = this.newNots.indexOf(msg);
    if (index !== -1) {
      this.newNots.splice(index, 1)
      this.deleteFromServer(msg._id);
      console.log(this.newNots);
      console.log(`${hosID}`, this.newNots.length)
      localStorage.setItem("hosID", JSON.stringify(hosID))
      localStorage.setItem("number of messages", JSON.stringify(this.newNots.length))
      
      
      //localStorage.setItem('deletedNotifcation', JSON.stringify(this.deletedNots));
    }

  }

  deleteFromServer(_id){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();

      this.http.delete('https://secure-cliffs-90491.herokuapp.com/userNotifications/' + _id, {headers: headers}).subscribe((res) => {
          resolve(res);
      }, (err) => {
          reject(err);
      });   

  });
  }



  addReminder(msg: any) {
    localStorage.setItem('message', JSON.stringify(msg));
    const modal = this.modalCtrl.create(ReminderPage);
    modal.present();
  }

  onLogin() {
    const modal = this.modalCtrl.create(LoginPage)
    modal.present();
  }

  onSignUp() {
    const modal = this.modalCtrl.create(SignupPage)
    modal.present();
  }




}
