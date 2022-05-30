import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';

import { GoogleMapComponent } from '../components/google-map/google-map.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: [
    './styles/maps.page.scss'
  ]
})
export class MapsPage implements AfterViewInit {

  @ViewChild(GoogleMapComponent, { static: false }) _GoogleMap: GoogleMapComponent;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: {lat: -34.9199842, lng: -56.149849}
    // uncomment the following line if you want to remove the default Map controls
    // disableDefaultUI: true
  };
  loadingElement: any;

  constructor(private loadingController: LoadingController) { }

  ngAfterViewInit() {
    // GoogleMapComponent should be available
    this._GoogleMap.$mapReady.subscribe(map => {
      this.map = map;
      console.log('ngAfterViewInit - Google map ready');
    });
    this.createLoader();
  }

  async createLoader() {
    this.loadingElement = await this.loadingController.create({
      message: 'Trying to get your current location...'
    });
  }

  async presentLoader() {
    await this.loadingElement.present();
  }

  async dismissLoader() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
    }
  }

  public geolocateMe(): void {
    this.presentLoader();
    Geolocation.getCurrentPosition().then(position => {

      const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(current_location);

      // add a marker
      const marker = new google.maps.Marker({
        position: current_location,
        title: 'You are here!',
        // animation: google.maps.Animation.DROP
      });

      // To add the marker to the map, call setMap();
      marker.setMap(this.map);

    }).catch((error) => {
      console.log('Error getting current location', error);

    }).finally(() => this.dismissLoader());
  }
}
