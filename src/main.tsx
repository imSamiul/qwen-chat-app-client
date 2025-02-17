import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient();

// Set up a Router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
