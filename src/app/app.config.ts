import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {NgxSerializerModule} from '@paddls/ngx-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, NgxSerializerModule.forRoot()),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations()
  ]
};
