import { PropsWithChildren, useEffect } from "react";
import { GoogleAPIContextProvider } from "../../shared/google-api/components/GoogleAPIContextProvider";
import { QueryClientProvider } from "../shared/query-client/QueryClientProvider";
import { PreloadIPCContextProvider } from "../shared/preload-ipc-context/PreloadIPCContextProvider";
import { usePreloadIPC } from "../shared/preload-ipc-context";

const RunSQLWrapper = ({ children }: PropsWithChildren) => {
  const { dangerouslyExposedSQLInjector, ipcTest } = usePreloadIPC();

  (window as (Window & typeof globalThis & {
    runSQL: (sql: string) => void;
  })).runSQL = (sql: string) => {
    console.log('Running SQL...');
    dangerouslyExposedSQLInjector(sql).then(console.log).catch(console.error).finally(() => console.log('Ran SQL'));
  };

  useEffect(() => {
    ipcTest('IPC test run from AppContextProvider').then(console.log).catch(console.error);
  }, []);
  return <>{children}</>;
};

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      <GoogleAPIContextProvider>
        <PreloadIPCContextProvider>
          <RunSQLWrapper>
            {children}
          </RunSQLWrapper>
        </PreloadIPCContextProvider>
      </GoogleAPIContextProvider>
    </QueryClientProvider>
  );
};
