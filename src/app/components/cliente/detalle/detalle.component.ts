import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { URL_BACKEND } from 'src/app/config/config';

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
  urlBackend: string = URL_BACKEND

  constructor( private clienteService: ClienteService,
    public modalService: ModalService,
    private authService: AuthService,
    private facturaService: FacturaService ) { }

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

  hasRole(role: string): boolean{
    return this.authService.hasRole(role);
  }

  delete( factura: Factura){
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Cliente',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then( (res ) => {
      if (res.value) {
        this.facturaService.delete(factura.id).subscribe(
          res => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura);
            Swal.fire({
              icon: 'success',
              title: "Factura Eliminada",
              text: `Factura ${factura.descripcion} eliminada con éxito.`
            })
          }
        )
      }
    })
  }
}
