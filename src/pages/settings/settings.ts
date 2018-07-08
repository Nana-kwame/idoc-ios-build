import { SignupPage } from './../signup/signup';
import { LoginPage } from './../login/login';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { User } from './../../models/user';
import { Http, Headers } from '@angular/http';
import { ImagesProvider } from '../../providers/images/images';
import { Camera } from '@ionic-native/camera';
import { PreviewModalPage } from '../preview-modal/preview-modal';
import { UploadmodalPage } from '../uploadmodal/uploadmodal';
import { Auth } from '../../providers/auth/auth';


import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  loginParams: { token: string, user: User }
  image: { filename: string, originalName: string, desc: string, hosID: string, created: string };
  imageUrl: 'https://calm-mountain-43648.herokuapp.com/image/';
  profilePic: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public http: Http,
    public authService: Auth,
    private imagesProvider: ImagesProvider,
    private camera: Camera,
    private storage: Storage,
    private actionSheetCtrl: ActionSheetController) {

    this.loginParams = this.navParams.get('loginParams');

  }


  ngOnInit(): void {
    if (this.loginParams != undefined) {
      //this.getProfilePic();
      this.storage.get(`${this.loginParams.user.hosID}`).then((val) => {
        this.profilePic = val
        console.log("Your picture ", this.profilePic);
      })

    }

  }

  getProfilePic() {
    return new Promise((resolve, reject) => {
      let hosID = this.loginParams.user.hosID
      console.log(hosID)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get('http://localhost:3030/imageID/' + hosID).map(res => res.json()).subscribe(
        data => {
          this.image = data;
          console.log("This is the fetched data ", this.image);
        }, (err) => {
          console.log("This is the error " + err);
        })
    })


  }

  openImage(img) {
    let modal = this.modalCtrl.create(PreviewModalPage, { img: img });
    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.openGallery()
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.openCamera()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  // public takePicture(sourceType) {
  //   // Create options for the Camera Dialog
  //   var options = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   };

  //   // Get the data of an image
  //   this.camera.getPicture(options).then((imagePath) => {
  //     let modal = this.modalCtrl.create(UploadmodalPage, { data: imagePath });
  //     modal.present();
  //     modal.onDidDismiss(data => {
  //       if (data && data.reload) {
  //         this.getProfilePic();
  //       }
  //     });
  //   }, (err) => {
  //     console.log('Error: ', err);
  //   });
  // }


  private openGallery(): void {
    let hosID = this.loginParams.user.hosID
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      // quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      // encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    // this.camera.getPicture(cameraOptions)
    //   .then(imageData => this.profilePic = "data:image/jpeg;base64," + imageData,
    //     err => console.log(err))
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.profilePic = "data:image/jpeg;base64," + imageData;
      this.storage.set(`${hosID}`, "data:image/jpeg;base64," + imageData);

    }, (err) => {
      console.log(err)
    })


  }

  openCamera() {
    let hosID = this.loginParams.user.hosID
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.profilePic = "data:image/jpeg;base64," + imageData;
      this.storage.set(`${hosID}`, "data:image/jpeg;base64," + imageData);

    }, (err) => {
      console.log(err);
    })

  }


  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.getProfilePic();
    });


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
