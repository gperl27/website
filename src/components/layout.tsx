import { PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { rhythm, styledScale } from "../utils/typography"
import { FadeLink } from "./link"

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const MainHeading = styled.h1`
  font-family: Montserrat, serif;
  ${styledScale(1)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const SubHeading = styled.h2`
  font-family: Montserrat, serif;
  margin-bottom: ${rhythm(2)};
`

const StyledLink = styled(FadeLink)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${`${rhythm(1.5)} ${rhythm(3 / 4)}`};
`

const StyledFooter = styled.footer`
  margin-top: ${rhythm(4)};
  text-align: center;
`

export const Layout = (props: Props) => {
  const { location, title, children } = props
  const rootPath = `/`

  const HeaderTitle = location.pathname === rootPath ? MainHeading : SubHeading

  return (
    <Content>
      <header>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
      </header>
      <main>{children}</main>
      <StyledFooter>
        <FadeLink to={`/contact`}>inquiries</FadeLink>
      </StyledFooter>
    </Content>
  )
}
