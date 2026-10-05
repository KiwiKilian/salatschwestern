import { Autocomplete, Modal, ModalDialog } from '@mui/joy';
import { useNavigate } from '@tanstack/react-router';

import { HEADER_ITEMS } from '@/modules/HEADER_ITEMS';

type CommandMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandMenu({ open, onClose }: CommandMenuProps) {
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ padding: 0 }}>
        <Autocomplete
          placeholder="Wo willst Du hin?"
          open
          autoFocus
          autoComplete
          autoHighlight
          isOptionEqualToValue={({ label: a }, { label: b }) => a === b}
          options={HEADER_ITEMS}
          onChange={async (event, option) => {
            // @ts-ignore
            await navigate({ to: option.to });
            onClose();
          }}
          slotProps={{
            root: {
              sx: (theme) => ({
                background: theme.vars.palette.gradient.faded,
              }),
            },
            listbox: {
              sx: (theme) => ({
                background: theme.vars.palette.gradient.faded,
              }),
            },
          }}
        />
      </ModalDialog>
    </Modal>
  );
}
