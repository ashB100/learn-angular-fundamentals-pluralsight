import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

// path will actually be /user/profile
const userRoutes:Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent}
];

export default RouterModule.forChild(userRoutes);