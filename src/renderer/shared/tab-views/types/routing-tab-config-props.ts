import { RoutingTabItemProps } from "./routing-tab-props";

type RoutingConfigTabItemProps = Omit<
  RoutingTabItemProps,
  "children" | "idx" | "index" | "pathMatch"
>;

// TODO: Experimental optional element for node children.

// type LeafTab = {
//   element: JSX.Element;
//   type: 'leaf';
// }

// type NodeTab = {
//   children: RoutingConfigTabListProps;
//   element?: JSX.Element;
//   type: 'node';
// }

export type RoutingConfigTabListProps = {
  selected?: number;
  // tabs: (RoutingConfigTabItemProps & (LeafTab | NodeTab))[];
  tabs: (RoutingConfigTabItemProps & {
    children?: RoutingConfigTabListProps;
  })[];
};
