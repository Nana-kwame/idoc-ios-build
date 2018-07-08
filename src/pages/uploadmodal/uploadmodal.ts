import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { Auth } from '../../providers/auth/auth';
import { User } from '../../models/user';

/**
 * Generated class for the UploadmodalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadmodal',
  templateUrl: 'uploadmodal.html',
})
export class UploadmodalPage {

  imageData: any;
  desc: string;

  loginParams: { token: string, user: User }


  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private imagesProvider: ImagesProvider,
    public authService: Auth) {
    this.imageData = this.navParams.get('data');
  }

  ionViewDidLoad(){
    this.loginParams = JSON.parse(this.authService.getUserData());
  }

  saveImage() {
    let hosID = this.loginParams.user.hosID

    this.imagesProvider.uploadImage(this.imageData, this.desc, hosID).then(res => {
      this.viewCtrl.dismiss({ reload: true });
    }, err => {
      this.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
