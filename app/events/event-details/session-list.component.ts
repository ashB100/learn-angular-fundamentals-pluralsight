import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/event.model';

@Component({
    selector: "session-list",
    templateUrl: "app/events/event-details/session-list.component.html"
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    // ngOnChanges gets called everytime an input gets a new value
    // ngOnChanges can be called before any of the data is set
    // so we want to check if sessions is set first 
    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);

            this.sortSessions(this.sortBy);
        }
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } 
        else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    sortSessions(sortBy) {
        if (sortBy === 'name') {
            this.visibleSessions.sort(sortByNameAsc);
        }
        else if (sortBy === 'votes'){
            this.visibleSessions.sort(sortByVotesDesc)
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1
    else if (s1.name === s2.name) return 0
    else return -1;
}
    
// Since we want a descending sort, if the second one has
// more votes it's going to be a positive number and 
// if it is less its going to be a negative number
function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}