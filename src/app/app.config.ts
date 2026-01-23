import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCe9lqPMeh09gUIrfEWnEqvOisqmhtMD34",
      authDomain: "portfolio-contact-sas.firebaseapp.com",
      projectId: "portfolio-contact-sas",
      storageBucket: "portfolio-contact-sas.firebasestorage.app",
      messagingSenderId: "368268966078",
      appId: "1:368268966078:web:9bfcd1818af9d0c6ca06ef"
    })),
    provideFirestore(() => getFirestore())
  ]
};
