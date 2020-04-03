import { DetalleFactura } from './detalle-factura';
import { Cliente } from './cliente';

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    fechaCreacion: string;
    detalles: Array<DetalleFactura> = [];
    cliente: Cliente;
    total: number;

    public calcularTotal(): number{
        this.total = 0;
        this.detalles.forEach((detalle: DetalleFactura) => {
            this.total += detalle.calcularImporte();
        });
        return this.total;
    }
}
