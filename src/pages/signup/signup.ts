import { SearchPage } from '../search/search';
import { Auth } from './../../providers/auth/auth';

import { TabsPage } from './../tabs/tabs';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { User } from '../../models/user';
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  toast: any;

  details: any

  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nationality: string;
  sex: string;
  DOB: any;
  hosID: string;
  loading: any
  profilePic: string;
  tabsPage = TabsPage;
  
  public base64Image: string;


  countries: any = ["Aruban", "Afghan", "Angolan", "Anguillian", "Albanian", "Andorran", "Armenian", "American Samoan", "Antarctican", "Antiguan Barbudan", "Australian", "Austrian", "British", "Azerbaijani", "Burundian", "Beninese", "Burkinabe", "Bangladeshi", "Belarus", "Cocos Islander", "Chilean", "Chinese", "Czech", "Danish", "Dominican", "Ecuadorean", "Egyptian", "Estonian", "Finnish", "Falkland Islander", "French", "Ghanaian", "Guinean", "Guadeloupian", "Guinea-Bissauan", "Honduran", "Ivorian", "Swiss", "Yemeni", "Zimbabwean"];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: Auth,
    public actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File,
    public loadCtrl: LoadingController) {
  }

  register(details) {


    if (this.password !== this.confirmPassword) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "Your passwords do not match",
        buttons: ["ok"]
      })
      alert.present();
    } if (this.fName == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "Your first name cannot be left unfilled",
        buttons: ["ok"]
      })
      alert.present();
    } if (this.lName == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "Your last name cannot be left empty",
        buttons: ["ok"]
      })
      alert.present();
    } if (this.DOB == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "No date of birth entered",
        buttons: ["ok"]
      })
      alert.present();
    } if (this.email == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "No email entered",
        buttons: ["ok"]
      })
      alert.present();
    } if (this.sex == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "No gender entered",
        buttons: ["ok"]
      })
      alert.present();
    }  if (this.hosID == null) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "No hospital id entered, check your hospital card for your hospital id",
        buttons: ["ok"]
      })
      alert.present();
    } else {
      this.details = {
        fName: this.fName,
        lName: this.lName,
        email: this.email,
        password: this.password,
        sex: this.sex,
        DOB: this.DOB,
        nationality: this.nationality,
        hosID: this.hosID,
        profilePic: this.profilePic
      };
      this.showLoader();
      this.authService.createAccount(this.details).then((res) => {
        this.loading.dismiss();
        console.log(res);
        this.navCtrl.setRoot(this.tabsPage, { loginParams: res });
      }, (err) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: "Check the values you have provided",
          buttons: ["ok"]
        })
        alert.present();
        console.log(err);
        
      });
    }
  }

  showLoader() {
    this.loading = this.loadCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }


  showToast() {
    this.toast = this.toastCtrl.create({
      message: 'Please check the provided information for any errors!!',
      duration: 3000,
      position: 'bottom'
    });

    this.toast.present()
  }


  onDismiss() {
    this.viewCtrl.dismiss();
  }


  addProfilePic() {
    this.presentActionSheet();
  }

  presentActionSheet() {

    let actionsheet = this.actionSheetCtrl.create({
      title: 'Choose a profile picture, please use a picture of you',
      buttons: [
        {
          text: 'Choose from gallery',
          handler: () => {
            this.openGallery()
          }
        },
        {
          text: 'Take a picture',
          handler: () => {
            this.openCamera()
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            console.log('cancel clicked')
          }
        }
      ]

    })
    actionsheet.present();
  }

  private openGallery(): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      // quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      // encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions)
      .then(imageData => this.profilePic = "data:image/jpeg;base64," + imageData,
        err => console.log(err))
  }

  openCamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.profilePic = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    })
  }
}


