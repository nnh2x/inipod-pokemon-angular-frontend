import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './modules/hompage/homepage.component';
import { AuthGuard } from './modules/core/auth.guard';
import { PokemonDisplayComponent } from './modules/pokemon-display/pokemon-display.component';
import { PokemonDetailComponent } from './modules/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
    {
        path: 'welcome',
        loadChildren: () =>
            import('./modules/login/login.router').then((m) => m.LoginRouter),
    },
    { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
    {
        path: 'pokemon-display',
        component: PokemonDisplayComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pokemon/:id',
        component: PokemonDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
