import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { GroceryForm } from "@/components/groceries/GroceryForm";
import { QueryKeys } from "@/modules/QueryKeys";
import { CreateGroceryDto, GroceriesService } from "@/modules/api";
import { queryClient } from "@/setup/queryClient";

function CreateGroceryPage() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (createGroceryDto: CreateGroceryDto) =>
      GroceriesService.create({ requestBody: createGroceryDto }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
      await navigate({ to: "/abrechnungsperiode" });
    },
  });

  return (
    <GroceryForm
      heading="🛒 Neuer Einkauf"
      submitLabel="Einkauf hinzufügen"
      onSubmit={(groceryDto) => {
        mutate(groceryDto);
      }}
    />
  );
}

export const Route = createLazyFileRoute("/einkaeufe/hinzufuegen")({
  component: CreateGroceryPage,
});
