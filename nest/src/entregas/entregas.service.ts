import { Injectable } from '@nestjs/common';
import { CreateEntregasDto } from './dto/create-entregas.dto';
import { UpdateEntregasDto } from './dto/update-entregas.dto';
import { prismaSaf } from '../../prisma-database-entrega-recepcion/prisma/prisma';
import { prismaUsers } from '../../prisma-database-users/prisma/prisma';
@Injectable()
export class EntregasService {
  async create(createEntregasDto: CreateEntregasDto) {
    return await prismaSaf.registro.create({
      data: {
        ...createEntregasDto ,
        fecha_movimiento: new Date(createEntregasDto.fecha_movimiento),
        rfc_movimiento: 'DIRG940621'
      }
    });
  }


  async findAll() {
    const registros = await prismaSaf.registro.findMany()

    const rfcs = [...new Set(registros.map(s => s.rfc_entrega))];
    const rfcr = [...new Set(registros.map(r => r.rfc_recibe))];   
    const deptos = [...new Set(registros.map(d => d.id_departamento))]; 

    const usuarios = await prismaUsers.s_usuario.findMany({
      where: {
        N_Usuario: { in: rfcs }
      }
    });

    const usuariosR = await prismaUsers.s_usuario.findMany({
      where: {
        N_Usuario: { in: rfcr }
      }
    });

    const depas = await prismaUsers.t_departamento.findMany({
      where: {
        id_Departamento: { in: deptos }
      }
    });

    const usuariosMap = new Map(
      usuarios.map(u => [u.N_Usuario, u])
    );

    const usuariosMapR = new Map(
      usuariosR.map(r => [r.N_Usuario, r])
    );

    const departamentosMap = new Map(
      depas.map(d => [d.id_Departamento, d])
    );

      return registros.map(registro => ({
        ...registro,
        usuario_entrega: usuariosMap.get(registro.rfc_entrega) || null, 
        usuario_recibe: usuariosMapR.get(registro.rfc_recibe) || null,
        departamento: departamentosMap.get(registro.id_departamento) || null
      }));
  }

 async findOne(id: number) {
    const registro = await prismaSaf.registro.findUnique({
      where: { id: id}
    })
    return registro;
  }

  async update(id: number, updateEntregasDto: UpdateEntregasDto) {
     return prismaSaf.registro.update({
      where:{ id },
      data: {
        ...updateEntregasDto,
      fecha_movimiento: new Date(updateEntregasDto.fecha_movimiento),
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} entregas 3`;
  }

  async selectDptos(){
    const dptos = await prismaUsers.t_departamento.findMany({
      where:{
        Estado: 1
      }
    })
    return dptos;
  }

  async selectSP(){
    const sp = await prismaUsers.s_usuario.findMany({
      where:{
        Estado: 1
      },
      select:{
        N_Usuario: true,
        Nombre: true
      },
    })
    return sp;
  }
}
