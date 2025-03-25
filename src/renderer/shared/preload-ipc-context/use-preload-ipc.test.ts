// TODO: Needs to run in jsdom mode, while items in other folders probably need node.
// This can be set up later.

import { renderHook } from '@testing-library/react';
import { usePreloadIPC } from './use-preload-ipc';
// import { getWindow } from '../window/get-window';
import { IPCRendererExposedProps } from '../../../shared/ipc/types/ipc-preload-props';
import { FinancialTransactionModelProps } from '../../../database/financial/transactions';

jest.mock('../window/get-window', () => {
  const ipc: IPCRendererExposedProps = {
    addFinancialTransactions: () => new Promise(() => { /* ... */ }),
    fetchFinancialTransactions: () => new Promise<FinancialTransactionModelProps[]>(() => { /* ... */ }),
    ipcTest: () => new Promise(() => { /* ... */ }),
  };
  return {
    getWindow: () => ({ ipc }),
  };
});

describe('usePreloadIPC', () => {
  it.skip('should return an object with the appropriate properties', () => {
    const { result } = renderHook(() => usePreloadIPC());
    expect(typeof result.current.addFinancialTransactions).toBe('function');
  });
});
