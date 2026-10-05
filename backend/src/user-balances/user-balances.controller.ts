import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserBalanceDto } from '@/user-balances/dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from '@/user-balances/dto/update-user-balance.dto';
import { UserBalancesService } from '@/user-balances/user-balances.service';

@ApiTags('UserBalances')
@Controller('user-balances')
export class UserBalancesController {
  constructor(private readonly userBalancesService: UserBalancesService) {}

  @Post()
  create(@Body() createUserBalanceDto: CreateUserBalanceDto) {
    return this.userBalancesService.create(createUserBalanceDto);
  }

  @Get()
  findAll() {
    return this.userBalancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBalancesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBalanceDto: UpdateUserBalanceDto) {
    return this.userBalancesService.update(id, updateUserBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBalancesService.remove(id);
  }
}
