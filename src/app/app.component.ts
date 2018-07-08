import { Component, ViewChild } from '@angular/core';
import { Platform , NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {StartPage} from '../pages/start/start';
import { OneSignal } from '@ionic-native/onesignal';
import { CacheService } from 'ionic-cache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild('nav') nav: NavController
 tabsPage= TabsPage;
 startPage = StartPage
 //rootPage:any = StartPage;
  


  constructor(platform: Platform,cache: CacheService, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      //Set TTL to 12h
      cache.setDefaultTTL(60*60*12);

      //Keep our cached results when the device is offline
      cache.setOfflineInvalidate(false);
      
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

