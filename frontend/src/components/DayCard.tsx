import { Box, Button, Sheet, Stack, Typography } from '@mui/joy';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import CrossIcon from '@/assets/cross.svg?react';
import { RemoveSaladDialog } from '@/components/RemoveSaladDialog';
import { UserAutocomplete } from '@/components/UserAutocomplete';
import { UserChip } from '@/components/UserChip';
import { Salad } from '@/modules/api';
import { useCreateSaladMutation } from '@/mutations/useCreateSaladMutation';

type DayCardProps = {
  date: Dayjs;
  salads?: Salad[];
};

export function DayCard({ date, salads }: DayCardProps) {
  const [userSelectEnabled, setUserSelectEnabled] = useState(false);

  const { mutate } = useCreateSaladMutation();

  const [removeSalad, setRemoveSalad] = useState<Salad>();

  return (
    <Sheet sx={{ padding: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} marginBottom={2}>
        <Box>
          <Typography level="title-lg">{date.format('dddd')}</Typography>
          <Typography level="title-md">{date.format('DD.MM.')}</Typography>
        </Box>
        <Typography level="h1" component="p" title="Anzahl Salate">
          {salads?.length} 🥗
        </Typography>
      </Stack>

      <Stack gap={1} direction="row" flexWrap="wrap">
        {salads?.map((salad) => <UserChip key={salad.id} user={salad.user!} onRemove={() => setRemoveSalad(salad)} />)}

        {userSelectEnabled ? (
          <UserAutocomplete
            autoFocus
            onChange={(user) => user && mutate({ userId: user.id, date })}
            excludeUsers={salads?.map(({ user }) => user!)}
          />
        ) : (
          <Button
            size="lg"
            onClick={() => setUserSelectEnabled(true)}
            endDecorator={<CrossIcon width={16} height={16} />}
          >
            Salat hinzufügen
          </Button>
        )}
      </Stack>

      <RemoveSaladDialog salad={removeSalad} onClose={() => setRemoveSalad(undefined)} />
    </Sheet>
  );
}
