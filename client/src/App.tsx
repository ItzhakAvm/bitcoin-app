import React from 'react';
import { Container, Stack } from '@mui/material';
import Header from './components/layout/Header';
import ThemeProvider from './components/theme/ThemeProvider';
import Dashboard from './components/crypto/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoriteList from './components/favorites/FavoriteList';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      {(onToggleTheme) => (
        <>
          <Header onToggleTheme={onToggleTheme} />
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/favorites" element={<FavoriteList />} />
              </Routes>
            </Stack>
          </Container>
        </>
      )}
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
