import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import userRoutes  from './user.routes';

@NgModule({
    imports: [
        CommonModule,
        userRoutes
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [

    ]
})
export default class UserModule {}