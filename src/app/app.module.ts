import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es-AR';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgForComponent } from './ng-for/ng-for.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './home/home/home.component';
import { FormComponent } from './components/cliente/form.component';
import { ClienteService } from './services/cliente.service';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DetalleComponent } from './components/cliente/detalle/detalle.component';
import { LoginComponent } from './components/usuarios/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';



registerLocaleData(locales, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NgForComponent,
    ClienteComponent,
    HomeComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTES,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
