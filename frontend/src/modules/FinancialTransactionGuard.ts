import { AccountBalance, FinancialTransactionType, Grocery, UserBalance } from '@/modules/api';
import { FinancialTransaction } from '@/types/FinancialTransaction';

export class FinancialTransactionGuard {
  public static isAccountBalance(transaction: FinancialTransaction): transaction is AccountBalance {
    return transaction.financialTransactionType === FinancialTransactionType.ACCOUNT_BALANCE;
  }

  public static isGrocery(transaction: FinancialTransaction): transaction is Grocery {
    return transaction.financialTransactionType === FinancialTransactionType.GROCERY;
  }

  public static isUserBalance(transaction: FinancialTransaction): transaction is UserBalance {
    return transaction.financialTransactionType === FinancialTransactionType.USER_BALANCE;
  }
}
