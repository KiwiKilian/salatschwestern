import { PartialType } from '@nestjs/swagger';

import { CreateUserBalanceDto } from '@/user-balances/dto/create-user-balance.dto';

export class UpdateUserBalanceDto extends PartialType(CreateUserBalanceDto) {}
