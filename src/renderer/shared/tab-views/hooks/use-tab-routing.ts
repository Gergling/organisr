import { useEffect, useMemo, useState } from "react";
import { RoutingTabListProps } from "../types";
import { useLocation, useNavigate } from "react-router";

export const useTabRouting = ({ selected: defaultSelected, tabs }: RoutingTabListProps) => {
  const [selected, setSelectedTab] = useState<number>(defaultSelected);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabFound = useMemo(
    () => {
      const tabMatches = tabs.filter(({ path }) => pathname.startsWith(path));
      const tab = tabMatches[tabMatches.length - 1];
      return tab;
    },
    [pathname]
  );

  useEffect(() => {
    setSelectedTab(tabFound?.idx || defaultSelected);
  }, [tabFound]);

  useEffect(() => {
    if (!tabFound) {
      const { path } = tabs[defaultSelected] || tabs[0];

      navigate(path);
    }
  }, [selected]);

  return {
    selected,
    tabs,
  };
};
