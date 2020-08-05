// tslint:disable-next-line:no-submodule-imports
import { createGlobalStyle, DefaultTheme } from "styled-components"
import { palette } from "../../palette"
import {
  rcSliderTooltipArrowStyles,
  rcSliderTooltipStyles,
} from "../components/common/baseStyles"
import { rhythm } from "./typography"

export interface Theme extends DefaultTheme {
  isDark?: boolean
  global: {
    bg: string
    color: string
    link: string
    linkHover: string
    inlineBgColor: string
    hr?: string
  }
  code: {
    highlightCodeLineBg: string
    highlightLineBorderLeftColor: string
  }
  palette: Palette
  actions: ActionPalette
}

enum ColorPalette {
  lightShades = "245, 242, 232",
  lightAccent = "109, 214, 243",
  mainBrand = "92, 193, 192",
  darkAccent = "172, 126, 152",
  darkShades = "36, 57, 79",

  lightYellow = "255,229,100",
  darkYellow = "#FFDE6B",
  lightGrey = "#575D61",

  success = "95, 153, 81",
  warning = "221, 136, 25",
  error = "244, 67, 54",
}

export interface Palette {
  lightShades: ColorPalette | string
  lightAccent: ColorPalette | string
  mainBrand: ColorPalette | string
  darkAccent: ColorPalette | string
  darkShades: ColorPalette | string
}

interface ActionPalette {
  primary: ColorPalette | string
  info: ColorPalette | string
  success: ColorPalette | string
  warning: ColorPalette | string
  error: ColorPalette | string
}

const baseTheme = {
  actions: {
    error: ColorPalette.error,
    info: palette.darkShades,
    primary: palette.mainBrand,
    success: ColorPalette.success,
    warning: ColorPalette.warning,
  },
  code: {
    highlightCodeLineBg: ColorPalette.lightGrey,
    highlightLineBorderLeftColor: ColorPalette.darkYellow,
  },
  palette,
}

export const darkTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.darkShades,
    color: palette.lightShades,
    hr: ColorPalette.lightGrey,
    inlineBgColor: ColorPalette.lightGrey,
    link: palette.mainBrand,
    linkHover: palette.lightAccent,
  },
}

export const lightTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.lightShades,
    color: palette.darkShades,
    inlineBgColor: ColorPalette.lightYellow,
    link: palette.mainBrand,
    linkHover: palette.darkAccent,
  },
}

export const GlobalStyle = createGlobalStyle<{
  theme: Theme
  didAppLoad: boolean
}>`
  html, body {
    height: 100%; 
  }

  body {
    background-color: rgb(${props => props.theme.global.bg});
    color: rgb(${props => props.theme.global.color});
    
    transition: background ${props =>
      props.didAppLoad ? "0.2s" : "0.0s"} ease-out;
  }
  
  a {
    color: rgb(${props => props.theme.global.link});
  }
  
  hr {
   background-color: ${props => props.theme.isDark && props.theme.global.hr};
  }
  
  a:hover {
    color: rgb(${props => props.theme.global.linkHover});
  }
  
  blockquote {
    color: inherit;
    border-left-color: inherit;
  }
  
  // rc-slider doesn't expose a nice way to change its tooltip styles
  .rc-slider-tooltip-inner {
     ${rcSliderTooltipStyles};
  }
  
  .rc-slider-tooltip-arrow {
    ${rcSliderTooltipArrowStyles};
  }
  
  .language-text {
    font-size: ${rhythm(0.65)} !important; 
    background: ${props =>
      props.theme.isDark
        ? props.theme.global.inlineBgColor
        : `rgba(${props.theme.global.inlineBgColor}, 0.2)`} !important;
    color: rgb(${props => props.theme.global.color}) !important;
  }
  
  .gatsby-highlight > pre {
    font-size: ${rhythm(0.5)} !important;
  }
  
  code {
    white-space: pre-wrap !important;
  }
  
  .gatsby-highlight-code-line {
    background-color: ${props => props.theme.code.highlightCodeLineBg};
    display: block;
    padding-left: 0.75em;
    border-left: .25em solid ${props =>
      props.theme.code.highlightLineBorderLeftColor};
    margin-right: -1em;
    margin-left: -1em;
}
`
