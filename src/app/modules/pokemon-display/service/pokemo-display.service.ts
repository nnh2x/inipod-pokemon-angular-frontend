import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { IResponse, IResponseApi } from '../../../share/IResponseApi.interface';
import { PageParams } from '../../../share/page.paramas';
import { PokemonTop, Pokemon } from '../../hompage/service/homepage.type';

export const [injectPokemonDisplayService, providerPokemonDisplayService] =
    createInjectionToken(() => {
        const httpClient = inject(HttpClient);
        const apiUrl = environment.apiUrl;

        return {
            dataPokemons: (params: PageParams) => {
                return httpClient.get<IResponse<Pokemon>>(
                    `${apiUrl}/pokemon/pokemons`,
                    {
                        params: { ...params },
                    }
                );
            },

            types: () => {
                return httpClient.post<string[]>(
                    `${apiUrl}/pokemon/distinct-types`,
                    {}
                );
            },

            importFile: (file: File) => {
                const formData = new FormData();
                formData.append('file', file);
                return httpClient.post<any>(
                    `${apiUrl}/pokemon/upload`,
                    formData
                );
            },
        };
    });
