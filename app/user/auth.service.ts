import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { IUser } from './user.model';

@Injectable()
export class AuthService {
    public currentUser: IUser;

    constructor(private http: Http) {}

    loginUser(userName: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});        
        // for our particular implementation the keys have to be in lowercase
        let loginInfo = {
            username: userName,
            password: password
        };

        return this.http.post('/api/login', JSON.stringify(loginInfo), options)
            .do(resp => {
                if (resp) {
                    this.currentUser = <IUser>resp.json().user;
                }
            })
            .catch(error => {
                // we've been re-throwing the error before but this time 
                // we want to return an Observable of false
                // since the login has failed.
                // Observable.of() creates a new observable object that has
                // one value inside it, not a string of values.
                return Observable.of(false);
            })

    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        // This endpoint simply returns nothing if the  
        // user's not authenticated on the server and the 
        // current user if they are. 
        // We will send back the user as a JSON string or
        // send back a blank string if user is not authenticated
        // We're changing that into either a object with user or 
        // an empty object. 
        // type response to be any so TypeScript doesn't complain: 
        // _body property actually does exist, it's just that Response type
        // does not have _body property!
        return this.http.get('/api/currentIdentity')
            .map( (response: any) => {
                // Since we'll get absolutely nothing in the body
                // if the user is not authenticated, if it is an empty
                // stream which is falsey then the user is not authenticated
                if (response._body) {
                    return response.json();
                }
                else {
                    return {};
                }
            })
            .do(currentUser => {
                if (!!currentUser.userName) {
                    this.currentUser = currentUser;
                }
            })
            .subscribe();
    }

    updateCurrentUser(firstName, lastName) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        // update current user on the client
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        // send it the the client to persist there
        // put(url, body, options)
        return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
    }

    logout() {
        // logout the user on the client side
        this.currentUser = undefined;

        // persist on the server
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/api/logout', JSON.stringify({}), options);
    }
}