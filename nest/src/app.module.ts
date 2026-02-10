import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EntregasModule } from './entregas/entregas.module';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, EntregasModule, DocumentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
