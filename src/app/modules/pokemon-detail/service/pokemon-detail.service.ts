import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { IResponseApi } from '../../../share/IResponseApi.interface';
import { Pokemon } from '../../hompage/service/homepage.type';
import { MarkAsFavoritePokemonId, PokemonId } from './pokemon-detail.type';

export const [injectDetailPokemonService, providerDetailPokemonService] =
    createInjectionToken(() => {
        const httpClient = inject(HttpClient);
        const apiUrl = environment.apiUrl;

        return {
            getDetailPokemon: (body: PokemonId) => {
                return httpClient.post<IResponseApi<Pokemon>>(
                    `${apiUrl}/pokemon/detail`,
                    body
                );
            },

            markAsFavorite: (body: MarkAsFavoritePokemonId) => {
                return httpClient.post<any>(`${apiUrl}/favorites`, body);
            },

            removeMarkAsFavorite: (body: MarkAsFavoritePokemonId) => {
                return httpClient.delete<any>(`${apiUrl}/favorites`, {
                    body: body,
                });
            },
        };
    });
