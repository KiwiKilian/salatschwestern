import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/modules/QueryKeys';
import { CurrentBillingPeriodService } from '@/modules/api';
import { CurrentBillingPeriodParameters } from '@/types/CurrentBillingPeriodParameters';

export const useCurrentBillingPeriodQuery = (parameters: CurrentBillingPeriodParameters = {}) =>
  useQuery({
    queryKey: QueryKeys.CurrentBillingPeriod.get(parameters),
    queryFn: () => CurrentBillingPeriodService.get(parameters),
    placeholderData: keepPreviousData,
  });
