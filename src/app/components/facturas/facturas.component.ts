import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { FacturaService } from 'src/app/services/factura.service';
import { Producto } from 'src/app/models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { DetalleFactura } from 'src/app/models/detalle-factura';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva Factura";
  factura: Factura;
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router) {

    this.factura = new Factura();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map( value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value? this._filter(value): [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.buscarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined{
    return producto? producto.nombre: undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent){
    let productoSeleccionado = event.option.value as Producto;

    if (this.existeDetalle(productoSeleccionado.id)){
      this.incrementarCantidad(productoSeleccionado.id)
    } else {
      let nuevoDetalle = new DetalleFactura();
      nuevoDetalle.producto = productoSeleccionado;
      this.factura.detalles.push(nuevoDetalle);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any) {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0){
      return this.eliminarDetalle(id);
    }

    this.factura.detalles = this.factura.detalles.map((detalle: DetalleFactura) => {
      if (id === detalle.producto.id){
        detalle.cantidad = cantidad;
      };
      return detalle;
    });
  }

  existeDetalle(id: number): boolean{
    let existe: boolean = false;

    this.factura.detalles.forEach((detalle: DetalleFactura) => {
      if(id === detalle.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementarCantidad(id: number){
      this.factura.detalles = this.factura.detalles.map((detalle: DetalleFactura) => {
        if (id === detalle.producto.id){
          ++detalle.cantidad;
        }
        return detalle;
      });
    }

    eliminarDetalle(id: number){
      this.factura.detalles = this.factura.detalles.filter((detalle: DetalleFactura) => id !== detalle.producto.id)
    }

    crear(){
      this.facturaService.create(this.factura).subscribe(factura => {
        Swal.fire({
          icon: 'success',
          title: 'Creación de factura',
          text: `${factura.descripcion} creada con éxito!`
        });
        this.router.navigate(['/clientes']);
      });
    }
}
