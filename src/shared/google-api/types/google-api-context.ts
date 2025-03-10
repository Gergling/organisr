export type GoogleApiContextProps = {
  getClient: () => typeof gapi.client;
  isLoading: boolean;
  signIn: () => Promise<gapi.auth2.GoogleUser>;
};
