import { MessagesProvider } from './../../providers/messages/messages';
import { Message } from './../../models/message';
import { TabsPage } from './../tabs/tabs';
import { Http, Headers } from '@angular/http';
import { User } from './../../models/user';
import { Auth } from './../../providers/auth/auth';
import { LoginPage } from './../login/login';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { InfermedicaProvider } from '../../providers/infermedica/infermedica';

//THIS IS ACTUALLY THE HOME PAGE 

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage implements OnInit {
  loginParams: { token: string, user: User }

  responses: any[] = [];
  //responses: Observable<any>;
  diagnosis: any;
  loading: any;
  watsonHospitals: any = [];
  tabsPage = TabsPage;
  profilePic: any;
  text: string;
  complainText: string;
  mention: any
  noInput: boolean = true;
  input: boolean = true;
  searchHos: any = []
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    public http: Http,
    private storage: Storage,
    private message: MessagesProvider,
    private infermedica: InfermedicaProvider,
    private authService: Auth) {
    this.loginParams = this.navParams.get('loginParams')

    //this.user = this.authService.getUserData();
    if (this.loginParams != undefined) {
      this.storage.get(`${this.loginParams.user.hosID}`).then((val) => {
        this.profilePic = val
        console.log('Your picture ', this.profilePic);
      });


    }

  }

  onOpenLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ngOnInit() {
    if (this.loginParams != undefined) {
      this.getDiagnosis();
    }
    this.showLoader();

    if (this.responses.length == 0) {
      this.text = "You have no current medical records. It is advisable to regulary visit your medical professional"
      console.log("The bloody text ", this.text);
    }
  }

  ionViewDidLoad() {


    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(this.tabsPage);
    }, (err) => {
      console.log("Not authorized")
      this.loading.dismiss()
    })



  }



  showLoader() {
    let text: string

    if (!this.loginParams) {
      text = 'Welcome...'
    } else {
      text = "Authenticating..."
    }

    this.loading = this.loadCtrl.create({
      content: text
    });

    //this.loading.present();
  }

  getDiagnosis() {

    return new Promise((resolve, reject) => {
      let hosID = this.loginParams.user.hosID

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get("https://obscure-dusk-24642.herokuapp.com/patient/" + hosID, { headers: headers }).map(res => res.json())
        .subscribe((response) => {
          this.responses = response.message;
          this.getRecords()
        });

    })
  }

  getRecords() {
    return new Promise((resolve, reject) => {
      let hosID = this.loginParams.user.hosID

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get("https://obscure-dusk-24642.herokuapp.com/diagnosis/" + hosID, { headers: headers }).map(res => res.json())
        .subscribe(res => {
          let data = res.message
          resolve(data)
          console.log("Trying my luck ", data)
          this.getHospital(data)
        });

    })
  }

  getHospital(diag) {

    return new Promise((resolve, reject) => {
      this.http.post('https://calm-mountain-43648.herokuapp.com/watsonHospitals', diag).map(res => res.json()).subscribe(res => {
        this.watsonHospitals = res
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  onTest(data) {
    data = {
      text: this.complainText,
      json: true
    }
    this.infermedica.parse(data).then((res) => {
      this.mention = res
      console.log(this.mention)
    })
    console.log(this.complainText)
    this.http.post("https://calm-mountain-43648.herokuapp.com/watsonHospitals", this.mention)
      .map(res => res.json())
      .subscribe(res => {
        this.searchHos = res
      })
  }

  onNoChange() {
    if (this.noInput = true) {
      this.noInput = false
      return this.noInput
    }
    if (this.noInput = false) {
      this.noInput = true
      return this.noInput
    }

  }
  onChange() {

    if (this.input = false) {
      this.input = true
      return this.input
    } if (this.input = true) {
      this.input = false
      return this.input
    }
  }

}