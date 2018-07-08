import { User } from './../../models/user';
import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { NotificationsPage } from '../notifications/notifications'
import { SettingsPage } from '../settings/settings';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { Auth } from '../../providers/auth/auth';
import { MessagesProvider } from '../../providers/messages/messages';




@Component({
  selector: 'pages-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  @ViewChild('myTabs') tabRef: Tabs;

  homePage = HomePage;
  searchPage = SearchPage;
  notificationsPage = NotificationsPage;
  settingsPage = SettingsPage;
  notificationNumber: any;

  loginParams: { token: string, user: User }

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth, public message: MessagesProvider) {

    this.loginParams = this.navParams.data
    //this.loginParams = this.authService.getUserData();
    //console.log("TabsPage...." + this.loginParams)

    if (this.loginParams !== undefined) {
      setInterval(() => {
        let hosID = JSON.parse(localStorage.getItem("hosID"))
        if (localStorage.getItem(`${hosID}`) !== "0") {
          this.notificationNumber = localStorage.getItem(`${hosID}`)
        }
      }, 1000)
      console.log("Number of notifications", this.notificationNumber)
    }
  }

  ngOnInit(): void {

  }

  changeTabs() {

  }




}


