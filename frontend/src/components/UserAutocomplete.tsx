import { Autocomplete } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { QueryKeys } from '@/modules/QueryKeys';
import { User, UsersService } from '@/modules/api';

type AddUserProps = {
  onChange: (user: User | null) => void;
  excludeUsers?: User[];
  autoFocus?: boolean;
};

export function UserAutocomplete({ onChange, excludeUsers, autoFocus }: AddUserProps) {
  const { data: users } = useQuery({
    queryKey: QueryKeys.Users.findAll({ active: true }),
    queryFn: async () => UsersService.findAll({ active: true }),
  });

  const [inputValue, setInputValue] = useState('');

  const filteredUsers =
    users?.filter((user) => !excludeUsers || !excludeUsers.map(({ id }) => id).includes(user.id)) || [];

  return (
    <Autocomplete
      autoFocus={autoFocus}
      variant="outlined"
      size="lg"
      placeholder="Salatschwester suchen"
      noOptionsText="Kein Ergebnis"
      autoComplete
      autoHighlight
      getOptionLabel={({ displayName }) => displayName}
      options={filteredUsers}
      inputValue={inputValue}
      onInputChange={(event, value) => {
        setInputValue(value);
      }}
      value={null}
      onChange={(event, value) => {
        if (value) {
          onChange(value);
          setInputValue('');
        }
      }}
    />
  );
}
