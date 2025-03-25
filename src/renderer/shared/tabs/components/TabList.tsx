import { Tab, Tabs } from "@mui/material"
import { TabStateProps } from "../types"
import { NavLink } from "react-router"

export const TabList = ({ selected, tabs }: TabStateProps) => {
  return (
    <Tabs value={selected}>
      {tabs.map(({ path, tabText }) => <Tab
        key={path}
        label={<NavLink to={path}>{tabText}</NavLink>}
      />)}
    </Tabs>
  )
}
