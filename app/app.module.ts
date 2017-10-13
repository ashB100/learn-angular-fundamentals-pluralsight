import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventsAppComponent } from './events.app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbNailComponent } from './events/event-thumbnail.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component'
import { CollapsibleWellComponent } from './common/collapsible-well.component';

import { DurationPipe } from './events/shared/duration.pipe';

import { EventListResolver } from './events/events-list-resolver.service';
import { EventService } from './events/shared/event.service';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { AuthService } from './user/auth.service';

import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { appRoutes } from './routes';

// Letting typescript know there's a global toastr object
declare let toastr: Toastr;

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)    
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbNailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
    ],
    providers: [
        EventListResolver,
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        EventRouteActivator,
        AuthService,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        }
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
