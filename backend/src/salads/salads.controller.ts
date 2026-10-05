import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSaladDto } from '@/salads/dto/create-salad.dto';
import { UpdateSaladDto } from '@/salads/dto/update-salad.dto';
import { SaladsService } from '@/salads/salads.service';

@ApiTags('Salads')
@Controller('salads')
export class SaladsController {
  constructor(private readonly saladsService: SaladsService) {}

  @Post()
  create(@Body() createSaladDto: CreateSaladDto) {
    return this.saladsService.create(createSaladDto);
  }

  @Get()
  findAll() {
    return this.saladsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saladsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaladDto: UpdateSaladDto) {
    return this.saladsService.update(id, updateSaladDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saladsService.remove(id);
  }
}
