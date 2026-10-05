import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountBalancesService } from '@/account-balances/account-balances.service';
import { CreateAccountBalanceDto } from '@/account-balances/dto/create-account-balance.dto';
import { UpdateAccountBalanceDto } from '@/account-balances/dto/update-account-balance.dto';

@ApiTags('AccountBalances')
@Controller('account-balances')
export class AccountBalancesController {
  constructor(private readonly accountBalancesService: AccountBalancesService) {}

  @Post()
  create(@Body() createAccountBalanceDto: CreateAccountBalanceDto) {
    return this.accountBalancesService.create(createAccountBalanceDto);
  }

  @Get()
  findAll() {
    return this.accountBalancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountBalancesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountBalanceDto: UpdateAccountBalanceDto) {
    return this.accountBalancesService.update(id, updateAccountBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountBalancesService.remove(id);
  }
}
