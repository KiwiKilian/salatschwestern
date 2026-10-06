import { Chip, ChipDelete } from "@mui/joy";

import CrossIcon from "@/assets/cross.svg?react";
import { User } from "@/modules/api";

type UserSaladProps = { user: User; onRemove?: () => void };

export function UserChip({ user, onRemove }: UserSaladProps) {
  return (
    <Chip
      variant="outlined"
      size="lg"
      sx={{ minHeight: 44 }}
      endDecorator={
        <ChipDelete onDelete={onRemove} sx={{ borderRadius: "50%", width: 24, height: 24 }}>
          <CrossIcon width={16} style={{ transform: "rotate(45deg)" }} />
        </ChipDelete>
      }
    >
      {user?.displayName}
    </Chip>
  );
}
