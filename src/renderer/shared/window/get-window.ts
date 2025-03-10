import { ExtendedWindow } from "./types";

export const getWindow = () => (window as Window) as ExtendedWindow;
