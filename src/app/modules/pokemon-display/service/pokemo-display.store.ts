import { tapResponse } from '@ngrx/operators';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PageParams, PARAMS } from '../../../share/page.paramas';
import { Pokemon } from '../../hompage/service/homepage.type';
import { injectPokemonDisplayService } from './pokemo-display.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { inject } from '@angular/core';

interface State {
    pokemons: Pokemon[];
    loading: boolean;
    params: PageParams;
    nzTotal: number;
    types: string[];
    total: number[];
    isLoading: boolean;
}

const initialState: State = {
    params: {
        ...PARAMS,
    },
    pokemons: [],
    loading: true,
    nzTotal: 0,
    types: [],
    total: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    isLoading: false
};
export const PokemonDisplayStore = signalStore(
    { providedIn: 'root' },
    withState({ ...initialState }),
    withMethods((store) => ({
        updateParamsPage(pageIndex: number): void {
            if (pageIndex < 0) return;
            patchState(store, {
                params: { ...store.params(), page: pageIndex },
            });
        },

        updateParamsSizePage(size: number): void {
            if (size < 0) return;
            patchState(store, {
                params: { ...store.params(), size: size },
            });
        },

        updateParamsSortsPage(sorts: string): void {
            patchState(store, {
                params: { ...store.params(), sorts: sorts },
            });
        },
        updateParamsSearchPage(filter: string): void {
            patchState(store, {
                params: { ...store.params(), filters: filter },
            });
        },
    })),
    withMethods(
        (
            state,
            service = injectPokemonDisplayService(),
            nzMessageService = inject(NzMessageService)
        ) => {
            const listPokemon = rxMethod<PageParams>(
                pipe(
                    
                    switchMap((params) =>
                        service.dataPokemons(params).pipe(
                            tapResponse({
                                next: (item) => {
                                    console.log(item.page.total);
                                    patchState(state, {
                                        pokemons: item.data,
                                        loading: false,
                                        nzTotal: item.page.total,
                                    });
                                },
                                error: () => {},
                                finalize() {},
                            })
                        )
                    )
                )
            );

            const typesPokemon = rxMethod<void>(
                pipe(
                    switchMap((params) =>
                        service.types().pipe(
                            tapResponse({
                                next: (item) => {
                                    patchState(state, {
                                        types: item,
                                    });
                                },
                                error: () => {},
                                finalize() {},
                            })
                        )
                    )
                )
            );

            return {
                listPokemon,
                typesPokemon,
                import: rxMethod<File>(
                    pipe(
                        tap(() => patchState(state, { isLoading: true })),
                        switchMap((file) =>
                            service.importFile(file).pipe(
                                tapResponse({
                                    next: (item) => {
                                        patchState(state, {
                                            isLoading: false,
                                        });
                                        nzMessageService.success(
                                            'Import successfully'
                                        );
                                    },
                                    error: () => {},
                                    finalize() {
                                        listPokemon(state.params);
                                        patchState(state, {
                                            isLoading: false,
                                        });
                                    },
                                })
                            )
                        )
                    )
                ),
            };
        }
    )
);
