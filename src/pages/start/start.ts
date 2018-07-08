import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  @ViewChild(Slides) slides: Slides;

  skipMsg: string = "Skip";
  state: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  skip(){
    this.navCtrl.setRoot(TabsPage);
  }

  slideChanged(){
    if(this.slides.isEnd()){
      this.skipMsg ='Get Started'
    }
  }
}
