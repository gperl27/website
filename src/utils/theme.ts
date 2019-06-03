// tslint:disable-next-line:no-submodule-imports
import { createGlobalStyle, DefaultTheme } from "styled-components"
import { palette } from "../../palette"
import {
  rcSliderTooltipArrowStyles,
  rcSliderTooltipStyles,
} from "../components/common/baseStyles"

export interface Theme extends DefaultTheme {
  global: {
    bg: string
    color: string
    link: string
    linkHover: string
    code: {
      pre: {
        background: string
      }
    }
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
  palette,
}

export const darkTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.darkShades,
    code: {
      pre: {
        background: palette.lightShades,
      },
    },
    color: palette.lightShades,
    link: palette.mainBrand,
    linkHover: palette.lightAccent,
  },
}

export const lightTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.lightShades,
    code: {
      pre: {
        background: palette.darkShades,
      },
    },
    color: palette.darkShades,
    link: palette.mainBrand,
    linkHover: palette.darkAccent,
  },
}

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
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
  
  // rc-slider doesn't expose a nice way to change its tooltip styles
  .rc-slider-tooltip-inner {
     ${rcSliderTooltipStyles};
  }
  
  .rc-slider-tooltip-arrow {
    ${rcSliderTooltipArrowStyles};
  }
  
  .gatsby-highlight > pre {
    background-color: rgb(${props =>
      props.theme.global.code.pre.background}) !important;
  }
`
