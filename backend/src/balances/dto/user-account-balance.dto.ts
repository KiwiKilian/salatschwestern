import { User } from "@/users/entities/user.entity";

export class UserAccountBalanceDto {
  user: User;

  balance: number;
}
