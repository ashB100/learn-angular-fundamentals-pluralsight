import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate {
    constructor (private eventService: EventService, private router: Router) {

    }
    
    canActivate(route:ActivatedRouteSnapshot) {
        const eventExists = !!this.eventService.getEvent(+route.params['id']);
        
        if (!eventExists) {
            this.router.navigate(['/404']);
        }

        return eventExists;
    }
}

// The EventRouteActivator is not used any more 
// for 'events/:id' route, instead the resolve 
// is used to prefatch event data.
// I'm just leaving this code here for reference.
