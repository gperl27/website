import { PageRendererProps } from "gatsby"
import React, { ReactNode, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { GlobalStyle, Theme } from "../utils/theme"
import { rhythm, styledScale } from "../utils/typography"
import { LightSwitch } from "./common/LightSwitch"
import { Footer } from "./footer"
import { FadeLink } from "./link"

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
  theme: Theme
}

const MainHeading = styled.h1`
  font-family: Montserrat, serif;
  ${styledScale(1.2)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
  color: rgb(${props => props.theme.palette.mainBrand});

  @media (max-width: 991px) {
    ${styledScale(0.75)};
    margin-bottom: 0;
  }

  @media (max-width: 467px) {
    ${styledScale(0.5)};
  }
`

const SubHeading = styled.h2`
  font-family: Montserrat, serif;
  margin-bottom: ${rhythm(2)};
  color: rgb(${props => props.theme.palette.mainBrand});

  @media (max-width: 991px) {
    ${styledScale(0.75)};
    margin-bottom: 0;
  }
`

const StyledLink = styled(FadeLink)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`

const Content = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${`${rhythm(1)}`};
`

const ColorSwitchWrapper = styled.div`
  position: absolute;
  right: ${rhythm(-6)};
  top: ${rhythm(2)};

  @media (max-width: 991px) {
    position: initial;
  }
`

const StyledHeader = styled.header`
  @media (max-width: 991px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rhythm(1.5)};
  }
`

export const Layout = (props: Props) => {
  const { location, title, children } = props
  const rootPath = `/`
  const theme = useContext(ThemeContext)

  const HeaderTitle = location.pathname === rootPath ? MainHeading : SubHeading

  return (
    <Content>
      <GlobalStyle theme={theme} didAppLoad={false} />
      <StyledHeader>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
        <ColorSwitchWrapper>
          <LightSwitch />
        </ColorSwitchWrapper>
      </StyledHeader>
      <main>{children}</main>
      <Footer />
    </Content>
  )
}
