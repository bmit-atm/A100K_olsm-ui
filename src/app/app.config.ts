import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { httpTokenInterceptorInterceptor } from './http-token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch(), withXsrfConfiguration(
    {cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'}
  ), withInterceptors([httpTokenInterceptorInterceptor]))]
};
