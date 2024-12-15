import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Pokemon, PokemonTop } from './homepage.type';
import { injectHomepageService } from './homepage.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { PageParams, PARAMS } from '../../../share/page.paramas';

interface State {
    topPokemon: PokemonTop[];
    loading: boolean;
    myPokemonFavorites: Pokemon[];
    params: PageParams;
}

const initialState: State = {
    params: {
        ...PARAMS,
    },
    topPokemon: [],
    loading: false,
    myPokemonFavorites: [],
};
export const HomepageStore = signalStore(
    { providedIn: 'root' },
    withState({ ...initialState }),
    withMethods((state, service = injectHomepageService()) => {
        return {
            getData: rxMethod<void>(
                pipe(
                    switchMap(() =>
                        service.getData().pipe(
                            tapResponse({
                                next: (item) => {
                                    console.log(item.data);
                                    patchState(state, {
                                        topPokemon: item.data,
                                        loading: false,
                                    });
                                },
                                error: () => {},
                                finalize() {},
                            })
                        )
                    )
                )
            ),
            myPokemonFavorite: rxMethod<PageParams>(
                pipe(
                    switchMap((params) =>
                        service.myPokemonFavorite(params).pipe(
                            tapResponse({
                                next: (item) => {
                                    console.log(item.data);
                                    patchState(state, {
                                        myPokemonFavorites: item.data,
                                        loading: false,
                                    });
                                },
                                error: () => {},
                                finalize() {},
                            })
                        )
                    )
                )
            ),
        };
    })
);
