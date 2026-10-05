import { Box, Button, FormControl, FormLabel, Input, Sheet, Stack } from '@mui/joy';
import dayjs from 'dayjs';
import { useFieldArray, useForm } from 'react-hook-form';

import { PageHeader } from '@/components/PageHeader';
import { UserAutocomplete } from '@/components/UserAutocomplete';
import { UserChip } from '@/components/UserChip';
import { CreateGroceryDto, User } from '@/modules/api';

type FormData = Omit<CreateGroceryDto, 'userIds'> & { users: User[] };

type GroceryFormProps = {
  heading: string;
  submitLabel: string;
  onSubmit: (groceryDto: CreateGroceryDto) => void;
  defaultValues?: Partial<FormData>;
};

export function GroceryForm({ heading, submitLabel, onSubmit, defaultValues }: GroceryFormProps) {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      users: [],
      ...defaultValues,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
    keyName: 'fieldId',
    rules: {
      required: true,
      minLength: 1,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ users, amount, ...data }) => {
        onSubmit({
          ...data,
          amount: -Math.abs(amount),
          userIds: users.map(({ id }) => id),
        });
      })}
    >
      <PageHeader heading={heading} />

      <Sheet sx={{ padding: 4 }}>
        <FormControl sx={{ marginBottom: 2 }}>
          <FormLabel>Datum</FormLabel>
          <Input
            required
            type="date"
            slotProps={{
              input: {
                min: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
                max: dayjs().format('YYYY-MM-DD'),
              },
            }}
            {...register('date', { required: true })}
          />
        </FormControl>

        <FormControl sx={{ marginBottom: 2 }}>
          <FormLabel>Einkaufspreis</FormLabel>
          <Input
            sx={{ textAlign: 'right' }}
            required
            slotProps={{
              input: {
                min: 0,
                step: 0.01,
              },
            }}
            type="number"
            {...register('amount', { required: true, min: 0 })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Einkäufer*innen</FormLabel>

          <Stack gap={1} direction="row" flexWrap="wrap">
            {fields.map((user, index) => (
              <UserChip key={user.id} user={user} onRemove={() => remove(index)} />
            ))}

            <UserAutocomplete onChange={(user) => user && append(user)} excludeUsers={fields} />
          </Stack>
        </FormControl>
      </Sheet>

      <Box sx={{ textAlign: 'center' }}>
        <Button size="lg" type="submit">
          {submitLabel}
        </Button>
      </Box>
    </form>
  );
}
