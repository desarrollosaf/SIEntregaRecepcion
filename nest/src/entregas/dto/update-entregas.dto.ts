import { PartialType } from '@nestjs/mapped-types';
import { CreateEntregasDto } from './create-entregas.dto';

export class UpdateEntregasDto extends PartialType(CreateEntregasDto) {
    rfc_entrega: string;
    rfc_recibe: string;
    id_departamento: number;
    fecha_movimiento: Date;
    rfc_movimiento: string;
}
