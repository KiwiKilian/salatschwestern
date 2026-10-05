import { Box, Button, FormControl, FormLabel, Input, Sheet } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { PageHeader } from '@/components/PageHeader';
import { QueryKeys } from '@/modules/QueryKeys';
import { CreateUserDto, UsersService } from '@/modules/api';
import { queryClient } from '@/setup/queryClient';

function CreateUserPage() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<CreateUserDto>();

  const { mutate } = useMutation({
    mutationFn: (createUserDto: CreateUserDto) => UsersService.create({ requestBody: createUserDto }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
      await navigate({ to: '/schwestern' });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      <PageHeader heading="👤 Neue Schwester" />

      <Sheet sx={{ padding: 4 }}>
        <FormControl sx={{ marginBottom: 2 }}>
          <FormLabel>Name</FormLabel>
          <Input required type="text" {...register('displayName', { required: true })} />
        </FormControl>

        <FormControl>
          <FormLabel>E-Mail</FormLabel>
          <Input required type="email" {...register('email', { required: true })} />
        </FormControl>
      </Sheet>

      <Box sx={{ textAlign: 'center' }}>
        <Button size="lg" type="submit">
          Schwester hinzufügen
        </Button>
      </Box>
    </form>
  );
}

export const Route = createLazyFileRoute('/schwestern/hinzufuegen')({
  component: CreateUserPage,
});
