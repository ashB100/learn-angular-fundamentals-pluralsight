import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './shared/event.service';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'events-list',
    template: `
        <div>

            <h1>Upcoming Angular Events</h1>
            <hr>

            <event-thumbnail 
                *ngFor="let event of events" 
                [event]="event"
                class="col-md-5">
            </event-thumbnail>
        </div>
    `
})
export class EventsListComponent implements OnInit {
    events: IEvent[];

    constructor(private route: ActivatedRoute, private eventService: EventService) {
        
    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }
}