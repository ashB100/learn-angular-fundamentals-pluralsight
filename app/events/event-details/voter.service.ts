import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Rx';

@Injectable() 
export class VoterService {
    constructor(private http: Http) {}
    
    deleteVoter(eventId, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);

        // We don't care about what is returned from the 
        // delete so self subscribing is appropriate in this case
        this.http
            .delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
            .catch(this.handleError)
            .subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        // We can self subscribe in this case as well as we don't care about what is returned 
        // The URL has all the appropriate data for adding the voter
        // so the body is an empty object.
        this.http
            .post(url, JSON.stringify({}), options)
            .catch(this.handleError)
            .subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}