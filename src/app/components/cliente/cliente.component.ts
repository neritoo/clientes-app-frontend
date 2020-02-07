import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

import swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
    `
    #imagenPequeña{
      width: 64px;
      height: 64px;
      cursor: pointer;
      object-fit: cover;
    }
    `
  ]
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page){
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe(
        res => {
          this.clientes = res.content as Cliente[];
          this.paginador = res;
        });
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
  }

  delete( cliente: Cliente){
    swal.fire({
      icon: 'warning',
      title: 'Eliminar Cliente',
      text: `¿Seguro que desea eliminar a ${cliente.apellido}, ${cliente.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then( (res ) => {
      if (res.value) {
        this.clienteService.delete(cliente.id).subscribe(
          res => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire({
              icon: 'success',
              title: "Cliente Eliminado",
              text: `Cliente ${cliente.apellido}, ${cliente.nombre} eliminado con éxito.`
            })
          }
        )
      }
    })
  }

  abrirModal( cliente: Cliente ){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
