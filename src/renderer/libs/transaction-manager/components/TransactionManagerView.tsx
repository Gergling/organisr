import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router";
import { TransactionManagerGDrive } from "../../transaction-manager-gdrive";
import { TransactionFileUpload } from "../../transaction-file-upload";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type TransactionManagerTabProps = {
  element: JSX.Element;
  idx: number;
  index?: boolean;
  path: string;
  tabText: string;
};

const tabs: TransactionManagerTabProps[] = [
  {
    element: <TransactionFileUpload />,
    index: true,
    path: '/upload',
    tabText: 'Manuél Upload',
  },
  {
    element: <TransactionManagerGDrive />,
    path: '/google-drive-download',
    tabText: 'Google Drive Download',
  },
].map((tab, idx) => ({ ...tab, idx }));

export const TransactionManagerView = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabFound = useMemo(
    () => tabs.find(({ path }) => path === pathname),
    [pathname]
  );

  useEffect(() => {
    if (tabFound) {
      setSelectedTab(tabFound.idx);
    } else {
      setSelectedTab(0);
    }
  }, [pathname]);

  useEffect(() => {
    if (!tabFound) {
      const [{ path }] = tabs;
      navigate(path);
    }
  }, [selectedTab]);

  return (
    <div>
      <div>
        This is the view for managing transaction files.
      </div>
      <div>
        ({pathname})
      </div>
      <Tabs value={selectedTab}>
        {tabs.map(({ path, tabText }) => <Tab
          key={path}
          label={<NavLink to={path}>{tabText}</NavLink>}
        />)}
      </Tabs>
      <Routes>
        {tabs.map(({ element, index, path }) => <Route
          key={path}
          path={path} index={index} element={element}
        />)}
      </Routes>
    </div>
  );
};
