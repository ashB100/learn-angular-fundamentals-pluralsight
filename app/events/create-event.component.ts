import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/event.service';

@Component({
    selector: 'create-event',
    templateUrl: "app/events/create-event.component.html",
    styles: [`
        em { 
        float:right; 
        color:#E05C65; 
        padding-left:10px;
        }
        .error input {background-color:#E3C3C5;}
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error ms-input-placeholder { color: #999; }
    `]
})
export class CreateEventComponent {
    isDirty:boolean = true;

    constructor(private route:Router, private eventService:EventService) {

    }

    saveEvent(fromValues) {
        // Call subscribe to actaully do the POST
        // It returns an event back but I don't
        // need to do anything with that event.
        // I just need to navigate and set the 
        // dirty flag to false after the call has been made
        this.eventService.saveEvent(fromValues)
            .subscribe(event => {
                this.isDirty = false;  // we have an event guard that will prevent
                // us from navigating away if isDirty is true.
                
                this.route.navigate(['/events']);
            });
    }

    cancel() {
        this.route.navigate(['/events']);
    }
}