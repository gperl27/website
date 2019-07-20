import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import styled, { css } from "styled-components"
import { rhythm } from "../utils/typography"
import { FadeLink } from "./link"

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rhythm(4)};
  text-align: center;
`

const LinkStyles = css`
  margin-left: ${rhythm(0.5)};
  margin-right: ${rhythm(0.5)};
`

const StyledLink = styled(FadeLink)`
  ${LinkStyles};
`

const StyledAnchor = styled.a`
  ${LinkStyles};
`

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          social {
            github
          }
        }
      }
    }
  `)

  return (
    <StyledFooter>
      <StyledLink to={`/`}>blog</StyledLink>
      <StyledLink to={`/about`}>about</StyledLink>
      <StyledLink to={`/contact`}>inquiries</StyledLink>
      <StyledAnchor
        rel="noopener"
        target="_blank"
        href={`https://github.com/${data.site.siteMetadata.social.github}`}
      >
        github
      </StyledAnchor>
    </StyledFooter>
  )
}
