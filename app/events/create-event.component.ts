import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'create-event',
    template: `
        <h1>New Event</h1>
        <hr>
        <div class="col-md-6">
            <h3>Create Event form will go here</h3>
            <br>
            <br>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="submit" 
                class="btn btn-secondary"
                (click)="cancel()">
                Cancel
            </button>
    `
})
export class CreateEventComponent {
    constructor(private route:Router) {

    }

    cancel() {
        this.route.navigate(['/events']);
    }
}