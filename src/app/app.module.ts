import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp,initializeApp  } from '@angular/fire/app';
import { getFirestore, provideFirestore,  } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClicResaltarFondoDirective } from 'src/app/directives/clic-resaltar-fondo.directive';
import { HoverFuenteDirective } from './directives/hover-fuente.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ClicResaltarFondoDirective,
    HoverFuenteDirective
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
