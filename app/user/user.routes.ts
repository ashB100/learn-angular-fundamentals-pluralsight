import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

// path will actually be /user/profile
const userRoutes:Routes = [
    { path: 'profile', component: ProfileComponent }
];

export default RouterModule.forChild(userRoutes);