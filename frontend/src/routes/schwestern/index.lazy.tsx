import { Box, Button, Sheet, Table } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import CrossIcon from '@/assets/cross.svg?react';
import { Amount } from '@/components/Amount';
import { ButtonLink } from '@/components/ButtonLink';
import { PageHeader } from '@/components/PageHeader';
import { QueryKeys } from '@/modules/QueryKeys';
import { BalancesService } from '@/modules/api';

function UsersPage() {
  const [filterActive, setFilterActive] = useState(true);

  const { data: userAccountBalances } = useQuery({
    queryKey: QueryKeys.Balances.getUsers({ active: filterActive }),
    queryFn: async () => BalancesService.getUsers({ active: filterActive }),
  });

  return (
    <>
      <PageHeader
        heading={`Schwestern${!filterActive ? ' (inaktiv)' : ''}`}
        actions={
          <ButtonLink to="/schwestern/hinzufuegen" endDecorator={<CrossIcon width={16} height={16} />}>
            Schwester hinzufügen
          </ButtonLink>
        }
      />

      <Sheet>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kontostand</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th style={{ width: '1%' }} />
            </tr>
          </thead>
          <tbody>
            {userAccountBalances?.map(({ user, balance }) => (
              <tr key={user.id}>
                <th scope="row">{user.displayName}</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td style={{ textAlign: 'right' }}>
                  <Amount value={balance} />
                </td>
                <td style={{ width: '1%', whiteSpace: 'nowrap', paddingLeft: '1rem' }}>
                  <ButtonLink
                    variant="plain"
                    size="sm"
                    to="/schwestern/$userId"
                    params={{ userId: user.id }}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Kontoauszug 📈
                  </ButtonLink>
                  <ButtonLink variant="plain" size="sm" to="/schwestern/$userId/buchen" params={{ userId: user.id }}>
                    Buchen 💸
                  </ButtonLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Box sx={{ marginTop: 2, marginBottom: 2, textAlign: 'center' }}>
        <Button onClick={() => setFilterActive((prevState) => !prevState)}>
          {filterActive ? 'Inaktive' : 'Aktive'} Schwestern anzeigen
        </Button>
      </Box>
    </>
  );
}

export const Route = createLazyFileRoute('/schwestern/')({
  component: UsersPage,
});
