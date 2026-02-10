import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
    path_marco: string;
    path_manual: string;
    path_doc1: string;
    path_doc2: string;
    id_departamento: number;
    tipo: number;
}
