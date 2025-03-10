import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { TabConfigItemProps } from "../types/tab-config-item-props";

export const useTabs = (tabs: TabConfigItemProps[]) => {
  const [selected, setSelectedTab] = useState<number>(0);
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
      const { path } = tabs.find(({ index }) => index) || tabs[0];

      navigate(path);
    }
  }, [selected]);

  return {
    selected,
    tabs,
  };
};
