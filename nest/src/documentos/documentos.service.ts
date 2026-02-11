import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { prismaSaf } from 'prisma-database-entrega-recepcion/prisma/prisma';
import { ConnectableObservable } from 'rxjs';


@Injectable()
export class DocumentosService {
  async create(file: Express.Multer.File, createDocumentoDto: CreateDocumentoDto, updateDocumentoDto: UpdateDocumentoDto) {
    const path = file.filename; 

    const campoMap: Record<number, string> = {
      1: 'path_marco',
      2: 'path_manual',
      3: 'path_doc1',
      4: 'path_doc2',
    };
    

    const reg = await prismaSaf.documentos.findFirst({
      where: {
        id_departamento: Number(createDocumentoDto.id_departamento)
      }
    })

    if(reg){
    const campo = campoMap[Number(updateDocumentoDto.tipo)];
    if (campo) {
      updateDocumentoDto[campo] = Number(createDocumentoDto.id_departamento)+'/'+path;
    }
    const { tipo: _, ...dataSinTipo } = updateDocumentoDto;

      console.log('modifica esto ',updateDocumentoDto)
      return await prismaSaf.documentos.update({
        where:{ id: Number(reg.id) },
        data: {
          ...dataSinTipo,
          id_departamento: Number(dataSinTipo.id_departamento)
        }
      })
    }else{
      const campo = campoMap[Number(createDocumentoDto.tipo)];
    if (campo) {
      createDocumentoDto[campo] = path;
    }
    const { tipo: _, ...dataSinTipo } = createDocumentoDto;

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

  async findOne(id: number) {
    const depto = await prismaSaf.documentos.findFirst({
      where: {
        id_departamento: id
      }
    })
    return depto;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }

  async verDoc(createDocumentoDto: CreateDocumentoDto){
    const docs = await prismaSaf.documentos.findFirst({
      where:{ id_departamento: createDocumentoDto.id_departamento}
    })
    const campoMap: Record<number, string> = {
      1: 'path_marco',
      2: 'path_manual',
      3: 'path_doc1',
      4: 'path_doc2',
    };
    if(docs){
      const campo = campoMap[Number(createDocumentoDto.tipo)];
      const path = docs[campo];
      if(path){
         console.log('entra path  ',path)
        return {
          path: path
        };
      }else{
       return {
          path: 0
        };
      }
    }
  }
}
