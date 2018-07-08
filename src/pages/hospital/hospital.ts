import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, Navbar } from 'ionic-angular';
import { Database } from '../../data/database.interface';
import { HospitalMapPage } from '../hospital-map/hospital-map';
import { HospitalService } from '../../services/hospital.service';
import { ConnectivityProvider } from '../../providers/connectivity/connectivity';
import { User } from '../../models/user';
import { Auth } from '../../providers/auth/auth';
import { Http, Headers } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@IonicPage()
@Component({
  selector: 'page-hospital',
  templateUrl: 'hospital.html',
})
export class HospitalPage implements OnInit {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

directionsHidden :boolean = true
see: boolean = false;
noSee: boolean = true;

  map: any
  image: string;
  hospitalName: string;
  location: string;
  description: string;
  service: string;
  lat: number;
  long: number;

  userLat: number;
  userLong: number;

  loginParams: { token: string, user: User }

  specialist: string[] = ["Allergist or Immunologist", "Anesthesiologist", "Cardiologist", "Dermatologist", "Gastroenterologist", "Hematologist/Oncologist", "Internal Medicine Physician", "Nephrologist", "Neurologist", "Neurosurgeon", "Obstetrician", "Gynecologist", "Nurse-Midwifery", "Occupational Medicine Physician", "Ophthalmologist", "Oral and Maxillofacial Surgeon", "Orthopaedic Surgeon", "Otolaryngologist (Head and Neck Surgeon)", "Pathologist", "Pediatrician", "Plastic Surgeon", "Podiatrist", "Psychiatrist", "Pulmonary Medicine Physician", "Radiation Onconlogist", "Diagnostic Radiologist ", "Rheumatologist ", "Urologist"];

  mapIntialised: boolean = false;
  apiKey: any = "AIzaSyA6Gp4UrMxBdL2pjj34b_vAA6Z4UPTc_Fo";


  hospitalGroup: { region: string, hospitals: Database[], icon: string };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: Auth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public http: Http,
    public geolocation: Geolocation,
    public hospitalService: HospitalService,
    public connectivityService: ConnectivityProvider) {


  }

  showDirections(){
    this.directionsHidden = false;
    this.see = true
    this.noSee = false;
  }

  hideDirections(){
    this.directionsHidden = true;
    this.see = false;
    this.noSee = true;
  }

  ionViewDidLoad() {
    
    const animationsOptions = {
      animation: 'wp-transition',
      duration: 300
    }

    this.navBar.backButtonClick = (e:UIEvent) =>{
      this.navCtrl.pop(animationsOptions)
    }

    this.hospitalName = this.navParams.get('hospitalName');
    this.location = this.navParams.get('location');
    this.description = this.navParams.get('description');
    this.service = this.navParams.get('services');
    this.lat = this.navParams.get('latitude');
    this.long = this.navParams.get('longitude');
    this.image = this.navParams.get('image');

    this.loginParams = JSON.parse(this.authService.getUserData());
    console.log("Hospital..." + this.loginParams);

    this.loadGoogleMaps()
    this.startNavigating();
  }



  //To Navigate to the hospital
  startNavigating() {

    this.geolocation.getCurrentPosition().then(position => {
      this.userLat = position.coords.latitude;
      this.userLong = position.coords.longitude;

      console.log(this.userLat + ' ' + this.userLong);
     

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);
      directionsDisplay.setPanel(this.directionsPanel.nativeElement);

      directionsService.route({
        origin: { lat:position.coords.latitude , lng: position.coords.longitude },
        destination: { lat:this.lat , lng:this.long  },
        travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {

        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res);
        } else {
          console.warn(status);
        }

      });



    }, error => {
      console.log('error', error);
    });


  }

  onAlert(details) {
    let prompt = this.alertCtrl.create({
      title: 'Book Appointment',
      message: 'What specialist would you want to see?',
      inputs: [
        {
          type: 'radio',
          label: "Allergist or Immunologist",
          value: "Allergist or Immunologist"
        },
        {
          type: 'radio',
          label: "Anesthesiologist",
          value: "Anesthesiologist"
        },

        {
          type: 'radio',
          label: "Cardiologist",
          value: "Cardiologist"
        },

        {
          type: 'radio',
          label: "Dermatologist",
          value: "Dermatologist"
        },

        {
          type: 'radio',
          label: "Gastroenterologist",
          value: "Gastroenterologist"
        },

        {
          type: 'radio',
          label: "Hematologist/Oncologist",
          value: "Hematologist/Oncologist"
        },

        {
          type: 'radio',
          label: "Internal Medicine Physician",
          value: "Internal Medicine Physician"
        },

        {
          type: 'radio',
          label: "Nephrologist",
          value: "Nephrologist"
        },

        {
          type: 'radio',
          label: "Neurologist",
          value: "Neurologist"
        },

        {
          type: 'radio',
          label: "Neurosurgeon ",
          value: "Neurosurgeon "
        },

        {
          type: 'radio',
          label: "Obstetrician",
          value: "Obstetrician"
        },

        {
          type: 'radio',
          label: "Gynecologist",
          value: "Gynecologist"
        },

        {
          type: 'radio',
          label: "Nurse-Midwifery",
          value: "Nurse-Midwifery"
        },

        {
          type: 'radio',
          label: "Occupational Medicine Physician",
          value: "Occupational Medicine Physician"
        },

        {
          type: 'radio',
          label: "Ophthalmologist",
          value: "Ophthalmologist"
        },

        {
          type: 'radio',
          label: "Oral and Maxillofacial Surgeon",
          value: "Oral and Maxillofacial Surgeon"
        },

        {
          type: 'radio',
          label: "Orthopaedic Surgeon",
          value: "Orthopaedic Surgeon"
        },

        {
          type: 'radio',
          label: "Otolaryngologist (Head and Neck Surgeon) ",
          value: "Otolaryngologist (Head and Neck Surgeon) "
        },

        {
          type: 'radio',
          label: "Pathologist",
          value: "Pathologist"
        },

        {
          type: 'radio',
          label: "Pediatrician",
          value: "Pediatrician"
        },

        {
          type: 'radio',
          label: "Plastic Surgeon",
          value: "Plastic Surgeon"
        },

        {
          type: 'radio',
          label: "Podiatrist",
          value: "Podiatrist"
        },

        {
          type: 'radio',
          label: "Psychiatrist",
          value: "Psychiatrist"
        },

        {
          type: 'radio',
          label: "Pulmonary Medicine Physician",
          value: "Pulmonary Medicine Physiciant"
        },

        {
          type: 'radio',
          label: "Radiation Onconlogist",
          value: "Radiation Onconlogist"
        },

        {
          type: 'radio',
          label: "Diagnostic Radiologist",
          value: "Diagnostic Radiologist"
        },

        {
          type: 'radio',
          label: "Rheumatologist",
          value: "Rheumatologist"
        },

        {
          type: 'radio',
          label: "Urologist",
          value: "Urologist"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Save clicked');
          }
        },
        {
          text: 'Submit',
          handler: (data: string) => {

            console.log('Save clicked ' + data);

            let details = {
              hosID: this.loginParams.user.hosID,
              patName: this.loginParams.user.fName + " " + this.loginParams.user.lName,
              hospitalName: this.hospitalName,
              date: new Date().toISOString(),
              specialist: data
            }


            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            this.http.post('https://secure-cliffs-90491.herokuapp.com/notifications', JSON.stringify(details), { headers: headers })
              .subscribe(res => {
                this.presentToast();
                console.log(JSON.stringify(res));
              }, (err) => {
                let toast = this.toastCtrl.create({
                  message: 'Sorry, you have already booked a previous appointment',
                  duration: 2000
                });
                toast.present();
              })

          }
        }
      ]
    });
    prompt.present();
  }






  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Booking was successfully sent',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.hospitalGroup = this.navParams.data;
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps Javascript needsd to be loaded");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online ,loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      }
    }
    else {
      if (this.connectivityService.isOnline()) {
        console.log('showing maps');
        this.initMap();
        this.enableMap();
      } else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }

  initMap() {
    this.mapIntialised = true;

    let LatLng = new google.maps.LatLng(this.lat, this.long);

    let mapOptions = {
      center: LatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    this.addMarker();

  }



  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = this.hospitalName;
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

  disableMap() {
    console.log('disbale map');
  }

  enableMap() {
    console.log("enable map")
  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == 'undefined' || typeof google.maps == "undefined") {

          this.loadGoogleMaps();
        } else {
          if (!this.mapIntialised) {
            this.initMap()
          }

          this.enableMap();
        }
      }, 20000);
    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOnline, false);
  }
}
