import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { PageParams, PARAMS } from '../../../share/page.paramas';
import { Pokemon } from '../../hompage/service/homepage.type';
import { injectDetailPokemonService } from './pokemon-detail.service';
import { MarkAsFavoritePokemonId, PokemonId } from './pokemon-detail.type';
import { ActivatedRoute } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

interface State {
    pokemon: Pokemon;
}

const initialState: State = {
    pokemon: {
        id: 0,
        createdAt: '',
        createdBy: undefined,
        updatedBy: undefined,
        name: '',
        type1: '',
        type2: '',
        total: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        spAttack: 0,
        spDefense: 0,
        speed: 0,
        generation: 0,
        legendary: '',
        image: '',
        ytbUrl: '',
    },
};
export const PokemonDetailStore = signalStore(
    { providedIn: 'root' },
    withState({ ...initialState }),
    withMethods(
        (
            state,
            service = injectDetailPokemonService(),
            route = inject(ActivatedRoute),
            message = inject(NzMessageService)
        ) => {
            const id = parseInt(route.snapshot.paramMap.get('id') || '', 10);
            const getData = rxMethod<PokemonId>(
                pipe(
                    switchMap((body) =>
                        service.getDetailPokemon(body).pipe(
                            tapResponse({
                                next: (item) => {
                                    patchState(state, {
                                        pokemon: item.data,
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
                getData,
                markAsFavorite: rxMethod<MarkAsFavoritePokemonId>(
                    pipe(
                        switchMap((body) =>
                            service.markAsFavorite(body).pipe(
                                tapResponse({
                                    next: (item) => {
                                        message.success(
                                            'Successfully added to favorites'
                                        );
                                    },
                                    error: () => {},
                                    finalize() {
                                        getData({ id: id });
                                    },
                                })
                            )
                        )
                    )
                ),
                removeMarkAsFavorite: rxMethod<MarkAsFavoritePokemonId>(
                    pipe(
                        switchMap((body) =>
                            service.removeMarkAsFavorite(body).pipe(
                                tapResponse({
                                    next: (item) => {
                                        message.warning(
                                            'Deleted successfully to favorites'
                                        );
                                    },
                                    error: () => {},
                                    finalize() {
                                        getData({ id: id });
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
