import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

import { Router } from '@angular/router';

@Component({
  templateUrl: "app/user/profile.component.html",
  styles: [`
    em { 
      float:right; 
      color:#E05C65; 
      padding-left:10px;
    }
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
      profileForm: FormGroup;
      private firstName: FormControl;
      private lastName: FormControl;

      constructor(private authService:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {}
      
      ngOnInit() {  
        let fname = '';
        let lname = '';
        if (this.authService.currentUser) {
          fname = this.authService.currentUser.firstName;
          lname = this.authService.currentUser.lastName;
        }

        this.firstName = new FormControl(fname, 
          [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.lastName = new FormControl(lname, Validators.required);  

        this.profileForm = new FormGroup({
          firstName: this.firstName, 
          lastName: this.lastName
        });
       }

       cancel() {
        this.router.navigate(['events']);
       }

       saveProfile(formValues) {
         if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
              .subscribe(() => {
                // we don't really care about the response here
                this.toastr.success('Profile saved.');
                //this.router.navigate(['events']);
              });
         }
      }

      logout() {
        // Here's a case where we might think logout doesn't 
        // sound like a HTTP get or put so maybe it should
        // be self subscribing. But we want to be able to take
        // an action when that logout actually happens.
        // We want to navigate the use to the login page, so
        // we want to be able to subscribe here.
        // So that's a good reason for making your HTTP methods
        // that wrap over an observable not to be self-subscribing.
        // That way you can take an action when they happen. 
        this.authService.logout().subscribe(() => {
          this.router.navigate(['/user/login']);
        })
      }

      validateFirstName() {
        return this.firstName.valid || this.firstName.untouched; 
      }

      validateLastName() {
        return this.lastName.valid || this.lastName.untouched; 
      }
}