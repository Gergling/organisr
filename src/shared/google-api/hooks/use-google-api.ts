import { useContext } from "react";
import { GoogleAPIContext } from "../components/GoogleAPIContext";

export const useGoogleAPI = () => {
  const context = useContext(GoogleAPIContext);

  if (!context) {
    throw new Error('useGoogleAPI used outside of GoogleAPIContextProvider');
  }

  return context;
};
