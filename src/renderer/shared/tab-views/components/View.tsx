import { useMatch } from "react-router";
import { useTabRouting } from "../hooks";
import { RoutingTabItemProps, RoutingTabListProps } from "../types";
import { TabList } from "./TabList";

const TabBody = ({ tabs }: RoutingTabListProps) => (
  <>
    {tabs.map((tab) => <View key={tab.path} tabRouting={tab} />)}
  </>
);

const TabsContainer = ({ tabs }: { tabs: RoutingTabListProps }) => {
  const tabData = useTabRouting(tabs);

  return (
    <>
      <TabList {...tabData} />
      <TabBody {...tabData} />
    </>
  );
};

export const View = ({
  tabRouting: {
    children,
    element,
    pathMatch
  }
}: {
  tabRouting: RoutingTabItemProps
}) => {
  const match = useMatch(pathMatch);

  return (
    <>
      {match ? <>
        {element}
        {children && <TabsContainer tabs={children} />}
      </> : null}
    </>
  );
};

export const RootView = TabsContainer;
