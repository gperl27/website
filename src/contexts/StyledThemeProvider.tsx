import React, { ReactNode, useContext } from "react"
import { ThemeProvider } from "styled-components"
import { ThemeManagerContext } from "./ThemeManager"

interface Theme {}

const darkTheme: Theme = {
  main: "mediumseagreen",
}

const lightTheme: Theme = {
  main: "blue",
}

interface Props {
  // children: ReactNode
}

const StyledThemeProvider = (props: Props) => {
  const themeManagerContext = useContext(ThemeManagerContext)

  const theme = themeManagerContext.isDark ? darkTheme : lightTheme

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export { StyledThemeProvider }
