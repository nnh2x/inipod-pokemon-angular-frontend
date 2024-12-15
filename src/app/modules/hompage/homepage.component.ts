import { Component, effect, inject, OnInit } from '@angular/core';
import { HomepageStore } from './service/homepage.store';
import { providerHomepageService } from './service/homepage.service';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hompage',
    standalone: true,
    imports: [CommonModule, NzCarouselModule],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    providers: [providerHomepageService()],
})
export class HomepageComponent {
    protected store = inject(HomepageStore);
    protected router = inject(Router);
    constructor(private sanitizer: DomSanitizer) {}
    effect = 'scrollx';
    ngOnInit(): void {
        this.store.getData();
        this.store.myPokemonFavorite(this.store.params);
    }

    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getIdOfYoutube(url: string): string {
        const videoId = url.split('/').pop();
        return videoId ?? '';
    }

    getDetail(id:number) {
        this.router.navigate(['/pokemon', id]);
    }
}
