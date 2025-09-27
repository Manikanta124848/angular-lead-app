import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    // provideHttpClient()
    provideHttpClient(withJsonpSupport())

    // { provide: APP_BASE_HREF, useValue: '/lansumEncanto' } 
  ]
};
