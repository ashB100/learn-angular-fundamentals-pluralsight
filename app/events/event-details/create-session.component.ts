import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';

@Component({
    templateUrl: "app/events/event-details/create-session.component.html",
    styles: [`
        em { 
        float:right; 
        color:#E05C65; 
        padding-left:10px;
        }
        .error input, .error select, .error textarea 
        { background-color:#E3C3C5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error ms-input-placeholder { color: #999; }
  `]
})
export class CreateSessionComponent implements OnInit {
    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo', 'bar'])]);
    
        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.presenter,
            level: this.level,
            abstract: this.abstract
        })
    }

    private restrictedWords(words) {
        return (control:FormControl):{[key:string]:any} => {
            if (!words) return null;
            
            let invalidWords = words
                .map(word => control.value.includes(word) ? word : null)
                .filter(word => word != null);

            let error = {
                'restrictedWords': invalidWords.join(', ')  
            };

            return invalidWords && invalidWords.length > 0 ? error : null; 
        };
    }

    

    saveSession(formValues) {
        let session:ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
        
        console.log(session);
    }
}