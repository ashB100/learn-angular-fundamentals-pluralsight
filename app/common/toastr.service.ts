import { OpaqueToken } from '@angular/core';

// TOASTR_TOKEN is an actual JavaScript object, 
// eventhough we're passing in a string 'toastr'
// As long as we use this same specific object to
// lookup in the dependency injector, nobody else 
// can accidentally use the same token or key in 
// the dependency registry so we don't get any conflicts
export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface Toastr {
    success (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
}