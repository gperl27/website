import React, { useContext } from "react"
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components"
import { ThemeManagerContext } from "./ThemeManager"

interface Theme extends DefaultTheme {
  global: {
    bg: string
    color: string
    link: string
    linkHover: string
  }

  palette: Palette
  actions: ActionPalette
}

enum ColorPalette {
  lightShades = "242, 242, 241",
  lightAccent = "139, 142, 149",
  mainBrand = "140, 100, 88",
  darkAccent = "133, 129, 137",
  darkShades = "32, 30, 32",

  success = "95, 153, 81",
  warning = "221, 136, 25",
  error = "244, 67, 54",
}

interface Palette {
  lightShades: ColorPalette
  lightAccent: ColorPalette
  mainBrand: ColorPalette
  darkAccent: ColorPalette
  darkShades: ColorPalette
}

interface ActionPalette {
  primary: ColorPalette
  info: ColorPalette
  success: ColorPalette
  warning: ColorPalette
  error: ColorPalette
}

const baseTheme = {
  actions: {
    error: ColorPalette.error,
    info: ColorPalette.darkShades,
    primary: ColorPalette.mainBrand,
    success: ColorPalette.success,
    warning: ColorPalette.warning,
  },
  palette: {
    darkAccent: ColorPalette.darkAccent,
    darkShades: ColorPalette.darkShades,
    lightAccent: ColorPalette.lightAccent,
    lightShades: ColorPalette.lightShades,
    mainBrand: ColorPalette.mainBrand,
  },
}

const darkTheme: Theme = {
  ...baseTheme,
  global: {
    bg: ColorPalette.darkShades,
    color: ColorPalette.lightShades,
    link: ColorPalette.mainBrand,
    linkHover: ColorPalette.lightAccent,
  },
}

const lightTheme: Theme = {
  ...baseTheme,
  global: {
    bg: ColorPalette.lightShades,
    color: ColorPalette.darkShades,
    link: ColorPalette.mainBrand,
    linkHover: ColorPalette.darkAccent,
  },
}

interface Props {
  children: any
}

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body {
    height: 100%; 
  }

  body {
    background-color: rgb(${props => props.theme.global.bg});
    color: rgb(${props => props.theme.global.color});
    
    transition: background 0.2s ease-out;
  }
  
  a {
    color: rgb(${props => props.theme.global.link});
  }
  
  a:hover {
    color: rgb(${props => props.theme.global.linkHover});
  }
  
  
  blockquote {
    color: inherit;
    border-left-color: inherit;
  }
`

type ThemeState = Theme & { isDark: boolean }

const StyledThemeProvider = (props: Props) => {
  const themeManagerContext = useContext(ThemeManagerContext)

  const isDark = themeManagerContext.isDark
  const currentTheme = isDark ? darkTheme : lightTheme
  const theme: ThemeState = { ...currentTheme, isDark }

  return (
    <ThemeProvider theme={theme}>
      <>
        {props.children}
        <GlobalStyle theme={theme} />
      </>
    </ThemeProvider>
  )
}

export { StyledThemeProvider }
