import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { IResponse, IResponseApi } from '../../../share/IResponseApi.interface';
import { Pokemon, PokemonTop } from './homepage.type';
import { PageParams } from '../../../share/page.paramas';

export const [injectHomepageService, providerHomepageService] =
    createInjectionToken(() => {
        const httpClient = inject(HttpClient);
        const apiUrl = environment.apiUrl;

        return {
            getData: () => {
                return httpClient.post<IResponseApi<PokemonTop[]>>(
                    `${apiUrl}/pokemon/highest-scores`,
                    {}
                );
            },

            myPokemonFavorite: (params: PageParams) => {
                return httpClient.get<IResponse<Pokemon>>(
                    `${apiUrl}/favorites/user-favorites`,
                    {
                        params: { ...params },
                    }
                );
            },
        };
    });
