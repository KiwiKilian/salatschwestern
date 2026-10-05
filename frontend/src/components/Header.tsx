import { css } from '@emotion/react';
import { Button, Container, List, ListDivider, ListItem, ListItemButton, styled, Typography } from '@mui/joy';
import { Link } from '@tanstack/react-router';
import { Fragment, useEffect, useState } from 'react';

import { CommandMenu } from '@/components/CommandMenu';
import { HEADER_ITEMS } from '@/modules/HEADER_ITEMS';

const StyledHeader = styled('header')(
  ({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 100;
    height: ${theme.spacing(8)};
    display: flex;
    backdrop-filter: blur(${theme.spacing(1)});
    border-bottom: 1px solid ${theme.vars.palette.neutral.outlinedBorder};

    &::after {
      content: '';
      background: ${theme.vars.palette.gradient.full};
      opacity: 0.05;
      position: absolute;
      inset: 0;
      z-index: -1;
    }
  `,
);

const StyledNav = styled('nav')(
  () => css`
    flex: 1 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
);

const StyledKeyCommand = styled('span')(
  ({ theme }) => css`
    margin-left: ${theme.spacing(0.5)};
    padding: ${theme.spacing(0.125)} ${theme.spacing(0.5)};
    background: ${theme.vars.palette.neutral.softBg};
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.vars.palette.neutral.outlinedBorder};
    border-radius: ${theme.radius.sm};
  `,
);

export function Header() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandMenuOpen((prevState) => !prevState);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <StyledHeader>
        <Container sx={{ display: 'flex' }}>
          <StyledNav>
            <Typography level="h3" sx={{ margin: 0 }}>
              🥗 Salatschwestern
            </Typography>

            <Button sx={{ display: { xs: 'block', md: 'none' } }} onClick={() => setCommandMenuOpen(true)}>
              Menü <StyledKeyCommand>⌘K</StyledKeyCommand>
            </Button>

            <List role="menubar" orientation="horizontal" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0 }}>
              {HEADER_ITEMS.map((item, index, array) => (
                <Fragment key={item.to}>
                  <ListItem role="none">
                    {/* @ts-ignore */}
                    <ListItemButton component={Link} to={item.to} role="menuitem">
                      {item.label}
                    </ListItemButton>
                  </ListItem>
                  {index + 1 < array.length && <ListDivider />}
                </Fragment>
              ))}
            </List>
          </StyledNav>
        </Container>
      </StyledHeader>
      <CommandMenu open={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
    </>
  );
}
