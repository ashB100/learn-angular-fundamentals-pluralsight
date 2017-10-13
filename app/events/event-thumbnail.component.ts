import { Component, Input } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" 
            class="well hoverwell thumbnail">
            <h2>{{event.name | uppercase }}</h2>
            <div>Date: {{event.date | date:'shortDate'}}</div>
            <div [ngClass]="getStartTimeClass()" 
                [ngSwitch]="event?.time">
                Time: {{event.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: {{event.price | currency:'USD':true}}</div>
            <div>
                <span>Location: {{event.location.address}}</span>
                <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
            </div>
        </div>
    `,
    styles: [`
        .green { color: green !important; }
        .bold { font-weight: bold; }
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb }
    `]
})
export class EventThumbNailComponent {
    @Input() event:IEvent;

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        
        if (isEarlyStart) {
            return 'green bold'
        }

        return '';
        // return ['green', 'bold']
        // return {green: isEarlyStart, bold: isEarlyStart};
    }
}