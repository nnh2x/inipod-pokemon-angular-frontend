import { Router } from '@angular/router';
import { Login } from './login.type';
import {
    signalStore,
    withState,
    withMethods,
    patchState,
    withComputed,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../../core/auth.service';
interface State {
    loading: boolean;
    login: Login;
}

const initialState: State = {
    login: {
        userName: '',
        password: '',
    },
    loading: false,
};

export const LoginStore = signalStore(
    { providedIn: 'root' },
    withState({ ...initialState }),
    withMethods(
        (
            state,
            authService = inject(AuthService),
            nzMessageService = inject(NzMessageService),
            router = inject(Router)
        ) => {
            return {
                login: rxMethod<Login>(
                    pipe(
                        switchMap((login) =>
                            authService.login(login).pipe(
                                tapResponse({
                                    next: (data) => {
                                        if (data.errorCode !== null) {
                                            switch (data.errorCode) {
                                                case 0:
                                                    nzMessageService.error(
                                                        data.message
                                                    );
                                                    break;
                                                case 1:
                                                    nzMessageService.info(
                                                        data.message
                                                    );
                                                    router.navigate(['/']);
                                                    break;
                                                default:
                                            }
                                        }
                                    },
                                    error: () => {},
                                    finalize() {},
                                })
                            )
                        )
                    )
                ),

                register: rxMethod<Login>(
                    pipe(
                        switchMap((login) =>
                            authService.register(login).pipe(
                                tapResponse({
                                    next: (data) => {
                                        if (data.errorCode !== null) {
                                            console.log(data.errorCode);

                                            switch (data.errorCode) {
                                                case 0:
                                                    nzMessageService.error(
                                                        data.message
                                                    );
                                                    break;
                                                case 1:
                                                    nzMessageService.info(
                                                        data.message
                                                    );
                                                    router.navigate([
                                                        'welcome/login',
                                                    ]);
                                                    break;
                                                default:
                                            }
                                        }
                                    },
                                    error: () => {},
                                    finalize() {},
                                })
                            )
                        )
                    )
                ),
            };
        }
    )
);
