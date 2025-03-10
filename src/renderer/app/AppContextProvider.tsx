import { PropsWithChildren } from "react";
import { GoogleAPIContextProvider } from "../../shared/google-api/components/GoogleAPIContextProvider";
import { QueryClientProvider } from "../shared/query-client/QueryClientProvider";
import { PreloadIPCContextProvider } from "../shared/preload-ipc-context/PreloadIPCContextProvider";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      <GoogleAPIContextProvider>
        <PreloadIPCContextProvider>
          {children}
        </PreloadIPCContextProvider>
      </GoogleAPIContextProvider>
    </QueryClientProvider>
  );
};
