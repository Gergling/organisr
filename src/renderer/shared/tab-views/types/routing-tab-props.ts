export type RoutingTabListProps = {
  selected: number;
  tabs: RoutingTabItemProps[];
};

export type RoutingTabItemProps = {
  children?: RoutingTabListProps;
  element: JSX.Element;
  idx: number;
  index?: boolean;
  path: string;
  pathMatch: string;
  tabText: string;
};
