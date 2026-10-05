import { useMutation } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

import { QueryKeys } from '@/modules/QueryKeys';
import { SaladsService } from '@/modules/api';
import { queryClient } from '@/setup/queryClient';

export const useCreateSaladMutation = () =>
  useMutation({
    mutationFn: ({ userId, date }: { userId: string; date: Dayjs }) =>
      SaladsService.create({
        requestBody: {
          userId,
          date: date.format('YYYY-MM-DD'),
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
    },
  });
