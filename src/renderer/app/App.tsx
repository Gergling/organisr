import { RootView } from "../shared/tab-views";
import { AppContextProvider } from "./AppContextProvider";
import { BrowserRouter } from "react-router";
import { routing } from "./AppRoutes";

const App = (): JSX.Element => (
  <AppContextProvider>
    <BrowserRouter>
      <RootView tabs={routing} />
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
