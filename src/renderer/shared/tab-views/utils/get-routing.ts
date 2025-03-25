import { RoutingConfigTabListProps, RoutingTabItemProps, RoutingTabListProps } from "../types";

export const getRouting = (
  { selected, tabs }: RoutingConfigTabListProps,
  parentPath = ''
): RoutingTabListProps => {
  return {
    selected: selected || 0,
    tabs: tabs.map(({ children, path, ...tab}, idx) => {
      const fullPath = [parentPath, path].join('/');
      const routing: RoutingTabItemProps = {
        ...tab,
        path: fullPath,
        pathMatch: fullPath,
        idx
      };
      if (children) {
        // Append the routes to children.
        routing.children = getRouting(children, fullPath);
        routing.pathMatch += '/*';
      }
      return routing;
    }),
  };
};
