import { createContext } from "react";
import { GoogleApiContextProps } from "../types/google-api-context";

export const GoogleAPIContext = createContext<GoogleApiContextProps | null>(null);
