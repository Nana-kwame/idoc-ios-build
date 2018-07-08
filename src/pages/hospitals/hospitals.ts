import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Database } from '../../data/database.interface';


import { HospitalPage } from '../hospital/hospital';
import { HospitalService } from '../../services/hospital.service';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-hospitals',
  templateUrl: 'hospitals.html',
})
export class HospitalsPage {


  selectedHospital: Database[];
  loginParams: { token: string, user: User }


  result: any;
  hospitalGroup: { region: string, hospitals: Database[], icon: string };
  hospitalPage = HospitalPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public hospitalService: HospitalService) {
    localStorage.setItem('hospitalGroup', JSON.stringify(this.navParams.get('data1')))


    this.loginParams = this.navParams.get('data2');
    // this.hospitalGroup = JSON.parse(localStorage.getItem('hospitalGroup'));
    this.generateHospitals();
  }


  ionViewDidLoad() {
    localStorage.setItem('hospitalGroup', JSON.stringify(this.navParams.get('data1')));
  }

  generateHospitals() {
    this.hospitalGroup = JSON.parse(localStorage.getItem('hospitalGroup'));
    console.log("GEN HOS ", this.hospitalGroup)
    // return this.hospitalGroup.hospitals;
  }

  onViewMore(selectedHospital: Database) {
    const animationsOptions = {
      animate:true,
      animation: 'wp-transition',
      duration: 750
    } 

    this.getHospital();
    this.navCtrl.push(this.hospitalPage, selectedHospital,animationsOptions)
  }

  getHospital() {
    this.selectedHospital = this.hospitalService.getSelectedHospital();
  }

  getHospitals(ev: any) {
    this.generateHospitals();
    let serVal = ev.target.value;
    if (serVal) {
      this.hospitalGroup.hospitals = this.hospitalGroup.hospitals.filter((hospital) => {

        return (hospital.hospitalName.toLowerCase().indexOf(serVal.toLowerCase()) > -1 || hospital.services.toLocaleLowerCase().indexOf(serVal.toLowerCase()) > -1);

      })
    } else {
      this.hospitalGroup = JSON.parse(localStorage.getItem('hospitalGroup'));
    }
  }

  cancelSearch() {
    // this.navCtrl.setRoot(this.navCtrl.getActive().component)
    // this.ionViewWillEnter();


    //this.generateHospitals();
    this.hospitalGroup = JSON.parse(localStorage.getItem('hospitalGroup'));
    console.log("CANCEL ", this.hospitalGroup)
    this.ionViewDidLoad();

  }

}
