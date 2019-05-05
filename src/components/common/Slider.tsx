import { createSliderWithTooltip, Range } from "rc-slider"
import React, { ComponentProps } from "react"
import styled, { withTheme } from "styled-components"
import { Theme } from "../../utils/theme"

const RangeWithTooltip = createSliderWithTooltip(Range)

interface Props extends Partial<ComponentProps<typeof RangeWithTooltip>> {
  theme: Theme
}

const StyledRange = styled(RangeWithTooltip)`
  & > .rc-slider-handle:active,
  .rc-slider-handle:focus {
    box-shadow: 0 0 5px rgb(${props => props.theme.palette.mainBrand});
  }
`

export const RangeSlider = withTheme((props: Props) => {
  const trackStyle = [
    {
      backgroundColor: `rgb(${props.theme.palette.mainBrand})`,
    },
  ]

  const handleStyle = [
    {
      borderColor: `rgb(${props.theme.palette.mainBrand})`,
    },
  ]

  return (
    <StyledRange handleStyle={handleStyle} trackStyle={trackStyle} {...props} />
  )
})
