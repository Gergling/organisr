import { createContext } from 'react';
import { PreloadIPC } from '../../../shared/ipc';
import { getWindow } from '../window/get-window';

export const PreloadIPCContext = createContext<PreloadIPC>(getWindow());
