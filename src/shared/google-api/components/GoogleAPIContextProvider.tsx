import { gapi } from "gapi-script";
import { PropsWithChildren, useEffect, useState } from "react";
import { DISCOVERY_DOCS, GOOGLE_API_CLIENT_ID, GOOGLE_API_KEY, SCOPES } from "../constants";
import { GoogleAPIContext } from "./GoogleAPIContext";

export const GoogleAPIContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = () => gapi.auth2.getAuthInstance().signIn();
  // const handleAuthClick = () => {
  //   gapi.auth2.getAuthInstance().signIn();
  // };

  const getClient = () => gapi.client;

  const updateSigninStatus = async (isSignedIn: boolean) => {
    if (isSignedIn) {
      // Set the signed in user
      // setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      setIsLoading(false);
    } else {
      // prompt user to sign in
      // handleAuthClick();
      await signIn();
    }
  };

  const initClient = () => {
    setIsLoading(true);
    getClient()
      .init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_API_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          const { isSignedIn } = gapi.auth2.getAuthInstance();
          // Listen for sign-in state changes.
          isSignedIn.listen(updateSigninStatus);
  
          // Handle the initial sign-in state.
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          updateSigninStatus(isSignedIn.get());
        },
        function (error) {
          console.log(error)
        }
      );
  };
  
  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  };

  // Not sure if I should be doing this here, but...
  useEffect(() => {
    handleClientLoad();
  }, []);

  return (
    <GoogleAPIContext.Provider value={{
      getClient,
      isLoading,
      signIn,
    }}>
      {children}
    </GoogleAPIContext.Provider>
  );
};
