import { Tab, Tabs } from "@mui/material";
import { RoutingTabListProps } from "../types";
import { NavLink } from "react-router";

export const TabList = ({ selected, tabs }: RoutingTabListProps) => (
  <Tabs value={selected}>
    {tabs.map(({ path, tabText }) => <Tab
      key={path}
      label={<NavLink to={path}>{tabText}</NavLink>}
    />)}
  </Tabs>
);
