import {
  createTheme,
  CssBaseline,
  ThemeProvider as BaseThemeProvider,
  useMediaQuery,
} from '@mui/material';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeMode, ToggleThemeHandler } from '../../types/theme';

type Props = {
  children:
    | ((onToggleTheme: ToggleThemeHandler) => ReactNode)
    | ReactNode
    | undefined;
};

export const ThemeProvider = (props: Props) => {
  const isPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState<boolean>();

  const handleToggleTheme: ToggleThemeHandler = useCallback(
    () => setDarkMode(!darkMode),
    [darkMode],
  );

  const theme = useMemo(() => {
    const mode = darkMode ? ThemeMode.DARK : ThemeMode.LIGHT;

    return createTheme({
      palette: {
        mode,
        background: {
          default: backgroundColors[mode],
        },
      },
    });
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(isPreferDarkMode);
  }, [isPreferDarkMode]);

  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      {typeof props.children === 'function'
        ? props.children(handleToggleTheme)
        : props.children}
    </BaseThemeProvider>
  );
};

const backgroundColors: { [key in ThemeMode]: string } = {
  dark: '#121212',
  light: '#e7ebf0',
};

export default ThemeProvider;
