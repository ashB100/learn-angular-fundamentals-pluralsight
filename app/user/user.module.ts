import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';
import userRoutes  from './user.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        userRoutes
    ],
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    providers: []
})
export default class UserModule {}