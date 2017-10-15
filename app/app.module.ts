import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventsAppComponent } from './events.app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbNailComponent } from './events/event-thumbnail.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component'
import { UpvoteComponent } from './events/event-details/upvote.component';
import { LocationValidator } from './events/location-validator.directive';

import { CollapsibleWellComponent, 
    TOASTR_TOKEN, 
    Toastr, 
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective } from './common/index';

import { DurationPipe } from './events/shared/duration.pipe';

import { EventListResolver } from './events/events-list-resolver.service';
import { EventService } from './events/shared/event.service';
import { AuthService } from './user/auth.service';
import { VoterService } from './events/event-details/voter.service';

import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { appRoutes } from './routes';

// Letting typescript know there's a global toastr object
declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)    
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbNailComponent,
        EventDetailsComponent,
        UpvoteComponent,
        CreateEventComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        LocationValidator
    ],
    providers: [
        EventListResolver,
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        {
            provide: JQ_TOKEN,
            useValue: jQuery
        },
        EventRouteActivator,
        AuthService,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        VoterService
    ],
    bootstrap: [ EventsAppComponent ]
})
export class AppModule{}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?');
    }
    
    return true;
}
