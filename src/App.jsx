import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchForm from './SearchForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchForm />
    </QueryClientProvider>
  );
}

export default App;