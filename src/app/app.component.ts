import { Component, inject, signal } from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { filter, take } from 'rxjs';
import { AuthService } from './modules/core/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NzButtonModule, RouterLink, NzDropDownModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'inipod-pokemon-angular-frontend';
    currentPath = signal<string>('');
    protected readonly router = inject(Router);
    protected auth = inject(AuthService);
    protected readonly activatedRoute = inject(ActivatedRoute);
    breadcrumbItems = signal<{ label: string; url: string }[]>([
        { label: '', url: '/' },
    ]);

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((data) => {
                this.currentPath.set(data.url);
            });
    }

    listOfPosition: NzPlacementType[] = [
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
        'topLeft',
        'topCenter',
        'topRight',
    ];

    logout(): void {
        this.auth.logout();
    }
}
