import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient()

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
   return (
     <BaseQueryClientProvider client={queryClient}>
       {children}
     </BaseQueryClientProvider>
   );
};
