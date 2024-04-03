import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["http://localhost:8000"],
            disallowedRoutes: ["http://localhost:8000/login"],
        },
    }),
), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch())]
};
