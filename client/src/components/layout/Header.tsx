import React from 'react';
import {
  AppBar,
  Toolbar,
  ToggleButton,
  Typography,
  useTheme,
  Container,
  Stack,
  Button,
} from '@mui/material';
import { CurrencyBitcoin, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { ThemeMode, ToggleThemeHandler } from '../../types/theme';

const pages = [
  { name: 'Dashboard', uri: '/' },
  { name: 'Favorites', uri: '/favorites' },
];

type Props = {
  onToggleTheme: ToggleThemeHandler;
};

const Header = (props: Props) => {
  const {
    palette: { mode: themePaletteMode },
  } = useTheme();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <CurrencyBitcoin />
          <Typography variant="h6" sx={{ ml: 1, mr: 3 }}>
            Bitcoin App
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ flexGrow: 1 }}
          >
            <Stack direction="row" spacing={2}>
              {pages.map((page) => (
                <Button key={page.name} href={page.uri} sx={{ color: '#fff' }}>
                  {page.name}
                </Button>
              ))}
            </Stack>
            <ToggleButton
              value="dark-mode"
              selected={ThemeMode.DARK === themePaletteMode}
              onChange={props.onToggleTheme}
            >
              <DarkModeIcon />
            </ToggleButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
