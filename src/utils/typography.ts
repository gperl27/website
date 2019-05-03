import { CSSObject } from "styled-components"
import Typography from "typography"
import altonTheme from "typography-theme-alton"
import "../theme.css"

altonTheme.overrideThemeStyles = () => {
  return {
    a: {
      color: "var(--textLink)",
    },
    "a.anchor": {
      boxShadow: "none",
    },
    'a.anchor svg[aria-hidden="true"]': {
      stroke: "var(--textLink)",
    },
    // gatsby-remark-autolink-headers - don't underline when hidden
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    // gatsby-remark-autolink-headers - use theme colours for the link icon
    hr: {
      background: "var(--hr)",
    },
  }
}

const typography = new Typography(altonTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

type StyledScale = (values: number) => CSSObject
export const styledScale = scale as StyledScale
