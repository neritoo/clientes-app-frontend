import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Region } from 'src/app/models/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo:string = "Crear cliente";
  cliente: Cliente = new Cliente();
  regiones: Region[];
  errores: String[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(){
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id){
          this.clienteService.getCliente(id).subscribe(
            cliente => this.cliente = cliente
          );
        }
      });
      this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);  
  }

  create(){
    this.waitAlert();
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire({
          icon: 'success',
          title: 'Nuevo Cliente',
          text: `Cliente ${cliente.apellido}, ${cliente.nombre} creado con éxito`
        }
        );
      },
      err => {
        this.errores = err.error.errors as String[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  update(){
    this.waitAlert();

    this.cliente.facturas = null;
    this.clienteService.update(this.cliente).subscribe(
      cli => {
        this.router.navigate(['/clientes']);
        swal.fire({
          icon: 'success',
          title: 'Cliente Actualizado',
          text: `Cliente ${this.cliente.apellido}, ${this.cliente.nombre} actualizado con éxito`
        });
      },
      err => {
        this.errores = err.error.errors as String[];
        console.log('Código del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }

  waitAlert(){
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere porfavor',
      timer: 3000
    });
  }

  comprarRegion(region: Region, regionCliente: Region): boolean{
    if (region == undefined && regionCliente == undefined){
      return true;
    }
    return region == null || regionCliente == null? false: region.id === regionCliente.id;
  }
}
