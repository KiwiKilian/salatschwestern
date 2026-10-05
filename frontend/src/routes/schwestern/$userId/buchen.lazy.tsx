import { Box, Button, FormControl, FormLabel, Input, Sheet } from '@mui/joy';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { PageHeader } from '@/components/PageHeader';
import { QueryKeys } from '@/modules/QueryKeys';
import { CreateUserBalanceDto, UserBalancesService, UsersService } from '@/modules/api';
import { queryClient } from '@/setup/queryClient';

function CreateUserBalancePage() {
  const navigate = useNavigate();
  const { userId } = useParams({ from: '/schwestern/$userId/buchen' });

  const { register, handleSubmit } = useForm<Omit<CreateUserBalanceDto, 'userId'>>();

  const { mutate } = useMutation({
    mutationFn: (createUserBalanceDto: CreateUserBalanceDto) =>
      UserBalancesService.create({ requestBody: createUserBalanceDto }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
      await navigate({ to: '/schwestern' });
    },
  });

  const parameters = { id: userId as string };
  const { data: user } = useQuery({
    queryKey: QueryKeys.Users.findOne(parameters),
    queryFn: () => UsersService.findOne(parameters),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate({ ...data, userId: userId as string });
      })}
    >
      <PageHeader heading={`💸 Buchung von ${user?.displayName}`} />

      <Sheet sx={{ padding: 4 }}>
        <FormControl sx={{ marginBottom: 2 }}>
          <FormLabel>Datum</FormLabel>
          <Input
            id="date"
            required
            type="date"
            slotProps={{
              input: {
                min: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
                max: dayjs().format('YYYY-MM-DD'),
              },
            }}
            min={dayjs().subtract(3, 'month').format('YYYY-MM-DD')}
            {...register('date', { required: true })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Betrag</FormLabel>
          <Input
            style={{ textAlign: 'right' }}
            required
            type="number"
            slotProps={{
              input: {
                step: 0.01,
                min: -999.99,
                max: 999.99,
              },
            }}
            {...register('amount', { required: true, min: -999.99, max: 999.99 })}
          />
        </FormControl>
      </Sheet>

      <Box sx={{ textAlign: 'center' }}>
        <Button size="lg" type="submit">
          Buchen
        </Button>
      </Box>
    </form>
  );
}

export const Route = createLazyFileRoute('/schwestern/$userId/buchen')({
  component: CreateUserBalancePage,
});
