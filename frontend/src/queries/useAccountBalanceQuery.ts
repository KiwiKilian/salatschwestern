import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/modules/QueryKeys";
import { BalancesService } from "@/modules/api";

export const useAccountBalanceQuery = () =>
  useQuery({ queryKey: QueryKeys.Balances.getAccount, queryFn: BalancesService.getAccount });
