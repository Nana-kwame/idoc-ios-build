
import { Auth } from './../../providers/auth/auth';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { SearchPage } from '../search/search';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: String;
  password: string
  loading: any;
  toast: any;
  modal: any;
  tabsPage = TabsPage;
  credentials: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public authService: Auth,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    // this.showLoader();

    // //Check if already authenticated
    // this.authService.checkAuthentication().then((res) => {
    //   console.log("Already authorized");
    //   this.loading.dismiss();
    //   this.navCtrl.setRoot(this.tabsPage);
    // }, (err) => {
    //   console.log("Not authorized")
    //   this.loading.dismiss()
    // })
  }

  login(credentials) {
    this.showLoader();

    this.credentials = {
      email: this.email,
      password: this.password
    };


    this.authService.login(this.credentials).then((loginDetails) => {
      this.loading.dismiss();
      console.log( loginDetails);

      this.authService.saveUserData(loginDetails);
      this.navCtrl.push(this.tabsPage,{loginParams:loginDetails})
    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: err,
        buttons: ["ok"]
      })
      alert.present();
      console.log(err);
    });
  }


  showLoader() {

    this.loading = this.loadCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }


  onDismiss() {
    this.viewCtrl.dismiss();
  }

  onRegister() {
    this.navCtrl.push(SignupPage);
  }



}
