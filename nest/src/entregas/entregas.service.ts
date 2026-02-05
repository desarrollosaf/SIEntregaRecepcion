import { Injectable } from '@nestjs/common';
import { CreateEntregasDto } from './dto/create-entregas.dto';
import { UpdateEntregasDto } from './dto/update-entregas.dto';
import { prismaSaf } from '../../prisma-database-entrega-recepcion/prisma/prisma';

@Injectable()
export class EntregasService {
  create(createEntregasDto: CreateEntregasDto) {
    return 'This action adds a new entregas';
  }

  async findAll() {
    const registros = await prismaSaf.registro.findMany()
  
    return registros;
  }

  findOne(id: number) {
    return `This action returns a #${id} entregas`;
  }

  update(id: number, updateEntregasDto: UpdateEntregasDto) {
    return `This action updates a #${id} entregas`;
  }

  remove(id: number) {
    return `This action removes a #${id} entregas`;
  }
}
