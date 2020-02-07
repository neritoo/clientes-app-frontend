import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Cliente } from '../models/cliente.js';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Region } from '../models/region.js';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = "http://localhost:8080/api/clientes";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient, private router: Router ) { }

  getClientes( page: number ): Observable<any>{
    //Casteo sin el uso del operador map:
    //return this.http.get<Cliente[]>(this.url)
    
    return this.http.get(`${this.url}/page/${page}`).pipe(
      map( (res: any ) => {
        (res.content as Cliente[]).map(cliente => {
          cliente.apellido = cliente.apellido.toUpperCase();
          let datePipe = new DatePipe('es-AR');
          //cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        return res;  
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.url, cliente, {headers: this.headers}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        
        if (e.status == 400){
          return throwError(e);
        }
        
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        })
        return throwError(e);
      }),
      map( (res: any ) => res.cliente as Cliente)
    );
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        Swal.fire(
          'Error al editar',
          e.error.mensaje, "error"
        );
        return throwError(e);
      }),
      map( res => res as Cliente )
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.url}/${cliente.id}`, cliente, {headers: this.headers}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        });
        return throwError(e);
      }),
      map( res => res as Cliente)
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete(`${this.url}/${id}`, {headers: this.headers}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error
        });
        return throwError(e);
      }),
      map( res => res as Cliente)
    );
  }

  uploadPhoto(archivo: File, id: any): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get(`${this.url}/regiones`).pipe(
      map( (resp => resp as Region[] )),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  public isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

}
