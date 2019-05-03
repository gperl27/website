import * as React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { FadeLink } from "./link"

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rhythm(4)};
  text-align: center;
`

const StyledLink = styled(FadeLink)`
  margin-left: ${rhythm(0.5)};
  margin-right: ${rhythm(0.5)};
`

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledLink to={`/about`}>about</StyledLink>
      <StyledLink to={`/contact`}>inquiries</StyledLink>
    </StyledFooter>
  )
}
