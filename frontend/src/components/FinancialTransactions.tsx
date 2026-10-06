import { Chip, ColorPaletteProp, Sheet, Table, Typography } from "@mui/joy";
import dayjs from "dayjs";

import { Amount } from "@/components/Amount";
import { ButtonLink } from "@/components/ButtonLink";
import { FinancialTransactionGuard } from "@/modules/FinancialTransactionGuard";
import { FinancialTransactionType, Salad } from "@/modules/api";
import { FinancialTransaction } from "@/types/FinancialTransaction";

type TransactionsProps = { transactions?: (FinancialTransaction | Salad)[]; edit?: boolean };

export function FinancialTransactions({ transactions = [], edit }: TransactionsProps) {
  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th style={{ width: 128 }}>Datum</th>
            <th colSpan={2}>Transaktion</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            {edit && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <th />
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Keine Transaktionen vorhanden<span style={{ fontSize: "0.2rem" }}>🥗🥗🥗</span>
              </td>
            </tr>
          )}
          {transactions.map((transaction) => {
            const isDeposit = "financialTransactionType" in transaction && transaction.amount >= 0;

            return (
              <tr key={transaction.id}>
                <td>
                  <Typography>{dayjs(transaction.date).format("DD.MM.YYYY")}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    startDecorator={
                      "financialTransactionType" in transaction
                        ? {
                            [FinancialTransactionType.ACCOUNT_BALANCE]: isDeposit ? "📈" : "📉",
                            [FinancialTransactionType.GROCERY]: "🛒",
                            [FinancialTransactionType.USER_BALANCE]: isDeposit ? "📈" : "📉",
                          }[transaction.financialTransactionType]
                        : "🥗"
                    }
                    color={(isDeposit ? "success" : "danger") as ColorPaletteProp}
                  >
                    {"financialTransactionType" in transaction ? (
                      <>
                        {FinancialTransactionGuard.isAccountBalance(transaction) &&
                          "Kassenkorrektur"}
                        {FinancialTransactionGuard.isGrocery(transaction) && "Einkauf"}
                        {FinancialTransactionGuard.isUserBalance(transaction) &&
                          (isDeposit ? "Einzahlung" : "Auszahlung")}
                      </>
                    ) : (
                      "Salat"
                    )}
                  </Chip>
                </td>
                <td>
                  {"financialTransactionType" in transaction ? (
                    <>
                      {FinancialTransactionGuard.isAccountBalance(transaction) && (
                        <i>{transaction.subject}</i>
                      )}
                      {FinancialTransactionGuard.isGrocery(transaction) &&
                        transaction.users?.map((user) => (
                          <Chip key={user.id} sx={{ marginRight: 0.5 }}>
                            {user.displayName}
                          </Chip>
                        ))}
                      {FinancialTransactionGuard.isUserBalance(transaction) && (
                        <Chip>{transaction.user?.displayName}</Chip>
                      )}
                    </>
                  ) : (
                    <Chip>{transaction.user.displayName}</Chip>
                  )}
                </td>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td>
                  <Amount
                    value={
                      "financialTransactionType" in transaction
                        ? transaction.amount
                        : -1 * (transaction.billingPeriod?.saladPrice || 0)
                    }
                  />
                </td>

                {edit && (
                  <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                    {"financialTransactionType" in transaction &&
                      FinancialTransactionGuard.isGrocery(transaction) &&
                      !transaction.billingPeriod && (
                        <ButtonLink
                          variant="plain"
                          size="sm"
                          to="/einkaeufe/$groceryId"
                          params={{ groceryId: transaction.id }}
                        >
                          Bearbeiten ✏️
                        </ButtonLink>
                      )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Sheet>
  );
}
