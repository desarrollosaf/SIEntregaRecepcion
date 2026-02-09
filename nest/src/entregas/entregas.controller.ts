import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregasDto } from './dto/create-entregas.dto';
import { UpdateEntregasDto } from './dto/update-entregas.dto';

@Controller('entregas')
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  @Post('saveRegistro')
  create(@Body() createEntregasDto: CreateEntregasDto) {
    return this.entregasService.create(createEntregasDto);
  }

  @Get()
   findAll() {
      return this.entregasService.findAll();
    }
  
  @Get('selectDeptos')
    selectDeptos() {
      return this.entregasService.selectDptos();
    }

  @Get('selectSP')
    selectSP() {
      return this.entregasService.selectSP();
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregasDto: UpdateEntregasDto) {
    return this.entregasService.update(+id, updateEntregasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregasService.remove(+id);
  }

  

}
