import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
      return next.handle(req).pipe(
        catchError( e => {
          if (e.status == 401){
            //Si el token expira (y nos devuelve codigo 401) y estamos auth,
            //tenemos que cerrar sesión por lado del cliente también.
            if(this.authService.isAuthenticated()){
              this.authService.logout();
            }
            this.router.navigate(['/login']);
          }
          if (e.status == 403){
            Swal.fire({
              icon: 'warning',
              title: 'Acceso denegado',
              text: `Hola ${this.authService.usuario.username}, no tienes acceso a este recurso!`
            })
            this.router.navigate(['/clientes']);
          }
          return throwError(e);
        })
      );
  }
}