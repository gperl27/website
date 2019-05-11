import { css } from "styled-components"
import { rhythm, styledScale } from "../../utils/typography"

const darkInputStyles = css`
  background-color: rgb(${props => props.theme.palette.lightShades});
  box-shadow: inset 0 ${rhythm(0.1)} ${rhythm(0.2)}
    rgba(${props => props.theme.palette.lightAccent}, 0.25);

  border: ${rhythm(0.075)} solid
    rgba(${props => props.theme.palette.mainBrand}, 0.65);

  &:hover {
    border-color: rgba(${props => props.theme.palette.mainBrand}, 1);
  }

  &:active,
  &:focus {
    box-shadow: 0 0 ${rhythm(0.05)} ${rhythm(0.05)}
      rgba(${props => props.theme.palette.mainBrand}, 1);
  }
`

const lightInputStyles = css`
  box-shadow: inset 0 ${rhythm(0.1)} ${rhythm(0.2)}
    rgba(${props => props.theme.palette.lightAccent}, 0.1);

  border: ${rhythm(0.02)} solid
    rgba(${props => props.theme.palette.lightAccent}, 0.35);

  &:hover {
    border-color: rgba(${props => props.theme.palette.lightAccent}, 0.625);
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 ${rhythm(0.025)}
      rgba(${props => props.theme.palette.darkAccent}, 0.625);
  }
`

export const baseInputStyles = css`
  ${styledScale(0.25)};
  border-radius: ${rhythm(0.25)};
  background-color: #fff;
  appearance: none;
  align-items: center;
  display: inline-flex;
  justify-content: flex-start;
  padding-top: ${rhythm(0.5)};
  padding-bottom: ${rhythm(0.5)};
  padding-left: ${rhythm(0.325)};
  padding-right: ${rhythm(0.325)};
  position: relative;
  max-width: 100%;
  width: 100%;
  outline: 0;

  ${props => (props.theme.isDark ? darkInputStyles : lightInputStyles)};
`

const lightSliderTooltipStyles = css`
  color: rgb(${props => props.theme.palette.lightShades}) !important;
  background-color: rgb(${props => props.theme.palette.lightAccent}) !important;
  border-color: rgb(${props => props.theme.palette.lightAccent}) !important;
  box-shadow: 0 0 4px rgb(${props => props.theme.palette.lightAccent}) !important;
`

const darkSliderTooltipStyles = css`
  color: rgb(${props => props.theme.palette.lightShades}) !important;
  background-color: rgb(${props => props.theme.palette.darkAccent}) !important;
  border-color: rgb(${props => props.theme.palette.darkAccent}) !important;
  box-shadow: 0 0 4px rgb(${props => props.theme.palette.darkAccent}) !important;
`

const lightSliderTooltipArrowStyles = css`
  border-top-color: rgb(${props => props.theme.palette.lightAccent}) !important;
`

const darkSliderTooltipArrowStyles = css`
  border-top-color: rgb(${props => props.theme.palette.darkAccent}) !important;
`

export const rcSliderTooltipStyles = css`
  ${props =>
    props.theme.isDark ? darkSliderTooltipStyles : lightSliderTooltipStyles};
`

export const rcSliderTooltipArrowStyles = css`
  ${props =>
    props.theme.isDark
      ? darkSliderTooltipArrowStyles
      : lightSliderTooltipArrowStyles};
`
