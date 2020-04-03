import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndpoint: string = 'http://localhost:8080/api/facturas';
  
  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get(`${this.urlEndpoint}/${id}`).pipe(
      map( res => res as Factura)
    );
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post(this.urlEndpoint, factura).pipe(
      map( res => res as Factura)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndpoint}/${id}`);
  }

  buscarProductos(termino: string): Observable<Producto[]>{
    return this.http.get(`${this.urlEndpoint}/buscar-productos/${termino}`).pipe(
      map( res => res as Producto[])
    );
  }
}
