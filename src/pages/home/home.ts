import { HospitalService } from './../../services/hospital.service';
import { User } from './../../models/user';
import { TabsPage } from './../tabs/tabs';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import database from '../../data/database';
import { Database } from '../../data/database.interface';

import { HospitalsPage } from '../hospitals/hospitals';
import { LoginPage } from '../login/login';


//THIS IS ACTUALLY THE SEARCH PAGE


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  loginParams: { token: string, user: User }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public hosService: HospitalService) {

    this.loginParams = this.navParams.get('loginParams')
    console.log("SearchPage test " + this.loginParams);
  }

  hospitalCollection: { region: string, hospitals: Database[], background: string }[];
  hospitalsPage = HospitalsPage;

  ngOnInit() {
    this.hospitalCollection = database;
  }

  ionViewDidLoad() {
    console.log("SearchPage test " + this.loginParams);
  }


  login() {
    this.navCtrl.push(LoginPage);

  }

 

}
