import { Route, Routes } from "react-router"
import { TabStateProps } from "../types"

export const TabBody = ({ tabs }: TabStateProps) => {
  return (
    <Routes>
      {tabs.map(({ element, index, path }) => <Route
        key={path}
        path={path} index={index} element={element}
      />)}
    </Routes>
  )
}
