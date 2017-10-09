import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';
import userRoutes  from './user.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        userRoutes
    ],
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    providers: []
})
export default class UserModule {}