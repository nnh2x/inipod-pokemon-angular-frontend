import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailStore } from './service/pokemon-detail.store';
import { providerDetailPokemonService } from './service/pokemon-detail.service';
import {
    MarkAsFavoritePokemonId,
    PokemonId,
} from './service/pokemon-detail.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-pokemon-detail',
    standalone: true,
    imports: [],
    templateUrl: './pokemon-detail.component.html',
    styleUrl: './pokemon-detail.component.scss',
    providers: [PokemonDetailStore, providerDetailPokemonService()],
})
export class PokemonDetailComponent {
    private readonly route = inject(ActivatedRoute);
    protected readonly id = parseInt(
        this.route.snapshot.paramMap.get('id') || '',
        10
    );
    protected store = inject(PokemonDetailStore);

    ngOnInit(): void {
        const id: PokemonId = {
            id: this.id,
        };
        this.store.getData(id);
    }
    constructor(private sanitizer: DomSanitizer) {}

    async getMarkAsFavorite() {
        const pokemonId: MarkAsFavoritePokemonId = {
            pokemonId: this.id,
        };
        this.store.markAsFavorite(pokemonId);
    }

    async removeMarkAsFavorite() {
        const pokemonId: MarkAsFavoritePokemonId = {
            pokemonId: this.id,
        };
        this.store.removeMarkAsFavorite(pokemonId);
    }

    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
