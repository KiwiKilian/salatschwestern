import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/setup/api';
import '@/setup/dayjs';
import { App } from '@/App';
import { queryClient } from '@/setup/queryClient';
import { theme } from '@/setup/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
