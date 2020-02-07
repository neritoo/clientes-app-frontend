import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;

  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor( private clienteService: ClienteService,
    public modalService: ModalService ) { }

  ngOnInit() {
    
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    //Reinicia la barra de progeso cuando se selecciona otra imagen.
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El archivo debe ser del tipo imagen'
      });
      this.fotoSeleccionada = null;
    };
  }

  subirFoto(){
    if (!this.fotoSeleccionada){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una foto'
      })
    } else {
      this.clienteService.uploadPhoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe( event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total) * 100);
        } else if(event.type === HttpEventType.Response) {
          let resp: any = event.body;
          
          this.cliente = resp.cliente as Cliente;

          this.modalService.notificarUpload.emit(this.cliente);
          Swal.fire({
            icon: 'success',
            title: 'Foto subida',
            text: resp.mensaje
          });
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
