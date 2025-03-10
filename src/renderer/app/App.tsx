import { Checklist } from "./Checklist";
import { AppContextProvider } from "./AppContextProvider";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import { FinanceView } from "../views/finance";

const NoMatch = () => {
  const { pathname } = useLocation();
  return (
    <div>
      ... How?
      How did you even get here?
      There's no address bar.
      The routing's over.
      Go <Link to="/">home</Link>.
      ({pathname})
    </div>
  );
};

const AppRoutes = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      Path: ({pathname})
      <Route path="/checklist" element={<Checklist />} />
      <Route index path="/*" element={<FinanceView />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

const App = (): JSX.Element => (
  <AppContextProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
