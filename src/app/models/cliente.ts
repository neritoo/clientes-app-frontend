import { Region } from './region';
import { Factura } from './factura';

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: string; 
    foto: string;
    region: Region;
    facturas: Array<Factura> = [];
}
