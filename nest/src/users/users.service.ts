import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { prismaUsers } from 'prisma-database-users/prisma/prisma';
import { prismaUsers } from '../../prisma-database-users/prisma/prisma';
import { response } from 'express';
import { NotFoundError } from 'rxjs';



@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() { 
    // const users = prismaUsers.s_users.;
    // return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUser(rfc:string, password: string){
  
}


}
