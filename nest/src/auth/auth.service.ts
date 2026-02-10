import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { prismaUsers } from '../../prisma-database-users/prisma/prisma';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService { 
   constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(rfc: string, password: string) {
    const userSaf = await prismaUsers.users_safs.findUnique({
      where:{
        rfc: rfc
      }, 
      include: {
        user : {
          include: {
              s_usuario: {
                  include: {
                    departamento: true
                  }
              }
            }
          }
        }
      })
  

    if (!userSaf) {
      throw new UnauthorizedException('El usuario no existe');
    }
    const hash = userSaf.password.replace('$2y$', '$2b$');

    const passwordOk = await bcrypt.compare(
      password.trim(),
      hash,
    );

    if (!passwordOk) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    let band = 0;
    if(userSaf.user.rango == 2 || userSaf.user.rango == 3 ){
      band = 1;
    }else if(userSaf.user.rango == 4){
      if(userSaf.user.s_usuario?.id_Dependencia == 3){
          band = 1;
      }else{
        band = 2;
      }
    }

    const payload = {
      id: String(userSaf.id),
      rfc: userSaf.rfc,
      bandera: band,
      depto: userSaf.user.s_usuario?.departamento.nombre_completo
    };
    
    const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
        user: {
          id: String(userSaf.id),
          rfc: userSaf.rfc,
          bandera: band,
          depto: userSaf.user.s_usuario?.departamento.nombre_completo,
          depto_id: userSaf.user.s_usuario?.departamento.id_Departamento,
        },
      };
  }
}

