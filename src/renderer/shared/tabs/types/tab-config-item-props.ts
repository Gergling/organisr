import { TabProps } from "@mui/material";

export type TabConfigItemProps = TabProps & {
  element: JSX.Element;
  idx: number;
  index?: boolean;
  path: string;
  tabText: string;
};
