import { PartialType } from "@nestjs/swagger";

import { CreateAccountBalanceDto } from "@/account-balances/dto/create-account-balance.dto";

export class UpdateAccountBalanceDto extends PartialType(CreateAccountBalanceDto) {}
