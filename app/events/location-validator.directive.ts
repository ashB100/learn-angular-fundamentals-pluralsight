import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLocation]',
    providers: [
        // NG_VALIDATORS is a list of services and we're adding one more
        // service to that list by setting multi to true.
        // In doing this we have registred our validator with Angular's
        // so that it is available as a validator in the forms
        { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }
    ]
})
export class LocationValidator implements Validator {
    // The class needs to implement a method called validate
    // It takes one parameter which is a FormGroup.
    // It returns an object that can have keys of type 
    // string and value of any type. 
    validate(formGroup: FormGroup): { [key: string]: any } {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        // Either the address city and country have to be 
        // filled in or the onlineUrl control has to be filled in
        if ( (addressControl && addressControl.value &&
            cityControl && cityControl.value &&
            countryControl && countryControl.value) || 
            (onlineUrlControl && onlineUrlControl.value) ) {
                // Returning a null tells the validation system
                // that this validation is passing 
                return null;
            }
            else {
                return {
                    validationLocation: false
                };
            }
    }
}