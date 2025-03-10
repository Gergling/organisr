import { IpcRenderer } from "electron";
import { setupIPCRendererInvocations } from "./setup-ipc-renderer-invocations";

describe('setupIPCRendererInvocations', () => {
  it('should return an object with the addFinancialTransactions function', () => {
    const invocations = setupIPCRendererInvocations({} as IpcRenderer);
    expect(typeof invocations.addFinancialTransactions).toBe('function');
  });
});
