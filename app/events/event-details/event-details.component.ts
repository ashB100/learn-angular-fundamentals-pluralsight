import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer }
    `]
})
export class EventDetailsComponent implements OnInit {
    event:IEvent;
    addMode:boolean;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService:EventService, private route:ActivatedRoute) {

    }

    ngOnInit() {
        // params is depracated
        /* this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id'])
        }); */

        // We don't need this now as the resolver prefetches our event data
        /*this.route.paramMap
            .switchMap((params: ParamMap) => {
                return this.eventService.getEvent(+params.get('id'));
            }).subscribe((event:IEvent) => {
                this.event = event;
                this.addMode = false;
            }); */

        // snapshot only takes the snapshot of the initial route parameters
        //this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);

        /*this.route.data.forEach(data => {
            this.event = data['event'];
            this.addMode = false;
        }) */

        this.route.data
            .subscribe(data => {
                this.event = data['event'];
                this.addMode = false;
        });
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    
        session.id = nextId;

        this.event.sessions.push(session);

        this.eventService.updateEvent(this.event);

        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}