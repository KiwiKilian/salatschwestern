import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { QueryKeys } from '@/modules/QueryKeys';
import { Salad, SaladsService } from '@/modules/api';
import { queryClient } from '@/setup/queryClient';

type RemoveSaladDialogProps = {
  salad?: Salad;
  onClose: () => void;
};

export function RemoveSaladDialog({ salad, onClose }: RemoveSaladDialogProps) {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id }: { id: string }) => SaladsService.remove({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CurrentBillingPeriod.index });
    },
  });

  return (
    <Modal open={!!salad} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>Salat löschen</DialogTitle>

        <DialogContent>
          <Typography>
            Bist Du dir sicher, dass du den Salat von <strong>{salad?.user?.displayName}</strong> am{' '}
            <strong>{dayjs(salad?.date).format('DD.MM.')}</strong> löschen willst?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              await mutateAsync({ id: salad!.id });
              onClose();
            }}
          >
            Salat löschen
          </Button>

          <Button onClick={onClose}>Abbrechen</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
