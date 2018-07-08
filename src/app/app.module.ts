import {Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import{ TabsPage } from '../pages/tabs/tabs'
import { HomePage } from '../pages/home/home';
import { HospitalsPage } from '../pages/hospitals/hospitals';
import {HospitalPage} from '../pages/hospital/hospital';
import { SearchPage } from '../pages/search/search';
import {LoginPage} from '../pages/login/login';
import { HospitalService } from '../services/hospital.service';
import { SettingsPage } from '../pages/settings/settings';
import {NotificationsPage} from '../pages/notifications/notifications';
import {StartPage} from '../pages/start/start';
import { SignupPage } from '../pages/signup/signup';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { HospitalMapPage } from '../pages/hospital-map/hospital-map';
import { Auth } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { CountriesProvider } from '../providers/countries/countries';
import { ReminderPage } from '../pages/reminder/reminder';
import { ImagesProvider } from '../providers/images/images';
import { FileTransfer } from '@ionic-native/file-transfer';
import {CacheModule} from 'ionic-cache';
import { ExpandableHeaderComponent } from '../components/expandable-header/expandable-header';
import { MessagesProvider } from '../providers/messages/messages';
import { InfermedicaProvider } from '../providers/infermedica/infermedica';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HospitalsPage,
    SearchPage,
    HospitalPage,
    LoginPage,
    TabsPage,
    SettingsPage,
    NotificationsPage,
    StartPage,
    SignupPage,
    HospitalMapPage,
    ReminderPage,
    ExpandableHeaderComponent

  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HospitalsPage,
    SearchPage,
    HospitalPage,
    LoginPage,
    TabsPage,
    SettingsPage,
    NotificationsPage,
    StartPage,
    SignupPage,
    HospitalMapPage,
    ReminderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HospitalService,
    ConnectivityProvider,
    OneSignal,
    Geolocation,
    File,
    Camera,
    Auth,
    Network,
    FileTransfer,
    LocalNotifications,
    CountriesProvider,
    ImagesProvider,
    MessagesProvider,
    InfermedicaProvider
  ]
})
export class AppModule {}
