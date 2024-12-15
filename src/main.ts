import {
    bootstrapApplication,
    provideClientHydration,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withFetch,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    DesktopOutline,
    PieChartOutline,
    TeamOutline,
    UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import vi from '@angular/common/locales/vi';
import { AuthInterceptor } from './app/modules/core/auth.interceptor';

registerLocaleData(en);
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom([
            BrowserAnimationsModule,
            NzIconModule.forRoot([
                PieChartOutline,
                UserOutline,
                DesktopOutline,
                TeamOutline,
            ]),
        ]),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideNzI18n(vi_VN),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideHttpClient(),
    ],
});
