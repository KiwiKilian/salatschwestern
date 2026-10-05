import { useMutation, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate, useParams } from '@tanstack/react-router';

import { GroceryForm } from '@/components/groceries/GroceryForm';
import { QueryKeys } from '@/modules/QueryKeys';
import { GroceriesService, UpdateGroceryDto } from '@/modules/api';
import { queryClient } from '@/setup/queryClient';

function UpdateGroceryPage() {
  const { groceryId } = useParams({ from: '/einkaeufe/$groceryId' });
  const navigate = useNavigate();

  const parameters = { id: groceryId };
  const { data: defaultValues } = useQuery({
    queryKey: QueryKeys.Groceries.findOne(parameters),
    queryFn: () => GroceriesService.findOne(parameters),
    select: (data) => ({
      date: data.date,
      amount: Math.abs(data.amount),
      users: data.users,
    }),
  });

  const { mutate } = useMutation({
    mutationFn: (updateGroceryDto: UpdateGroceryDto) =>
      GroceriesService.update({ id: groceryId, requestBody: updateGroceryDto }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.Groceries.findOne(parameters) }),
      ]);

      await navigate({ to: '/abrechnungsperiode' });
    },
  });

  return defaultValues ? (
    <GroceryForm
      heading="🛒 Einkauf"
      submitLabel="Einkauf speichern"
      onSubmit={(groceryDto) => {
        mutate(groceryDto);
      }}
      defaultValues={defaultValues}
    />
  ) : null;
}

export const Route = createLazyFileRoute('/einkaeufe/$groceryId')({
  component: UpdateGroceryPage,
});
