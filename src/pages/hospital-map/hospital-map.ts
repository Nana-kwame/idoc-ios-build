import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-hospital-map',
  templateUrl: 'hospital-map.html',
})

export class HospitalMapPage {
  @ViewChild('map') mapElement

  map: any
  lat: number;
  long: number;
  hospitalName: string;
  location: string;
  description: string;
  service: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  

  ionViewDidLoad() {

    this.hospitalName = this.navParams.get('hospitalName');
    this.location = this.navParams.get('location');
    this.description = this.navParams.get('description');
    this.service = this.navParams.get('services');
    this.lat = this.navParams.get('latitude');
    this.long = this.navParams.get('longitude');
 
    console.log(this.lat)
    this.initMap();
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

 
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }

  initMap() {
    let LatLng = new google.maps.LatLng(this.lat, this.long);

    let mapOptions = {
      center: LatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }
}
