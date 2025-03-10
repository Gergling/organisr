import { PropsWithChildren } from "react";
import { PreloadIPCContext } from "./PreloadIPCContext";
import { getWindow } from "../window/get-window";

export const PreloadIPCContextProvider = ({ children }: PropsWithChildren) => {
  const windowExtendedWithIPC = getWindow();
  return (
    <PreloadIPCContext.Provider value={windowExtendedWithIPC}>
      {children}
    </PreloadIPCContext.Provider>
  )
};

