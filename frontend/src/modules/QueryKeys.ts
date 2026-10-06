import {
  BalancesService,
  BillingPeriodsService,
  GroceriesService,
  UsersService,
} from "@/modules/api";
import { CurrentBillingPeriodParameters } from "@/types/CurrentBillingPeriodParameters";

export class QueryKeys {
  static Balances = {
    index: ["Balances"],
    getAccount: ["Balances", "getAccount"],
    getUsers: (parameters: Parameters<typeof BalancesService.getUsers>[0]) => [
      ...this.Balances.index,
      "getUsers",
      parameters,
    ],
    getUser: (parameters: Parameters<typeof BalancesService.getUser>[0]) => [
      ...this.Balances.index,
      "getUser",
      parameters,
    ],
  };

  static BillingPeriods = {
    index: ["BillingPeriods"],
    findAll: ["BillingPeriods", "findAll"],
    findOne: (parameters: Parameters<typeof BillingPeriodsService.findOne>[0]) => [
      ...this.BillingPeriods.index,
      "findOne",
      parameters,
    ],
  };

  static CurrentBillingPeriod = {
    index: ["CurrentBillingPeriod"],
    get: (parameters: CurrentBillingPeriodParameters) => [
      ...this.CurrentBillingPeriod.index,
      "get",
      parameters,
    ],
  };

  static Groceries = {
    index: ["Groceries"],
    findOneIndex: ["Groceries", "findOne"],
    findOne: (parameters: Parameters<typeof GroceriesService.findOne>[0]) => [
      "Groceries",
      "findOne",
      parameters,
    ],
  };

  static FinancialTransactions = {
    get: ["FinancialTransactions", "get"],
  };

  static Users = {
    index: ["Users"],
    findAll: (parameters: Parameters<typeof UsersService.findAll>[0]) => [
      ...this.Users.index,
      "findAll",
      parameters,
    ],
    findOne: (parameters: Parameters<typeof UsersService.findOne>[0]) => [
      ...this.Users.index,
      "findOne",
      parameters,
    ],
  };

  static UserBalances = {
    index: ["UserBalances"],
  };
}
