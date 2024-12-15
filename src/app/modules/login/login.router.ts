import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const LoginRouter: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent },
];
