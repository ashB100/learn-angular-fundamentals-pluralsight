import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'events-app',
    template: `
        <nav-bar></nav-bar>
        <h2>Location</h2>
        <p>Latitude: {{location?.coords.latitude}}, Longitude {{location?.coords.longitude}}</p>
        <router-outlet></router-outlet>
    `
})
export class EventsAppComponent {
    location;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        // It will be a http call but it will be a 
        // self subscribing method so we don't need 
        // to subscribe here.
        // checkAuthenticationStatus() will check the
        // authenticatio status on the server. If the server
        // says user is logged in, it is going to update the current
        // user on the client which will then make the user logged in
        // on the server. 
        this.auth.checkAuthenticationStatus();

        navigator.geolocation.getCurrentPosition((position) => {
            this.location = position;
            //let googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          } );
    }
}