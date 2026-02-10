import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { prismaSaf } from 'prisma-database-entrega-recepcion/prisma/prisma';
import { ConnectableObservable } from 'rxjs';


@Injectable()
export class DocumentosService {
  async create(file: Express.Multer.File, createDocumentoDto: CreateDocumentoDto, updateDocumentoDto: UpdateDocumentoDto) {
    const path = file.path; 

    const campoMap: Record<number, string> = {
      1: 'path_marco',
      2: 'path_manual',
      3: 'path_doc1',
      4: 'path_doc2',
    };
    
    const campo = campoMap[Number(createDocumentoDto.tipo)];

    if (campo) {
      createDocumentoDto[campo] = path;
      updateDocumentoDto[campo] = path;
    }
    const { tipo: _, ...dataSinTipo } = createDocumentoDto;

    const reg = await prismaSaf.documentos.findFirst({
      where: {
        id_departamento: Number(createDocumentoDto.id_departamento)
      }
    })

    if(reg){
      const reg1 = prismaSaf.documentos.update({
      where:{ id: reg.id },
      data: {
        ...updateDocumentoDto
      }
    })
    return {
      ...reg,
      id_departamento: Number(dataSinTipo.id_departamento),
    };
    }else{
      return await prismaSaf.documentos.create({
      data: {
        ...dataSinTipo,
        id_departamento: Number(dataSinTipo.id_departamento)
      }
    })
  }
}

  findAll() {
    return `This action returns all documentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
