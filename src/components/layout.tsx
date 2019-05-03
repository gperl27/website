import { PageRendererProps } from "gatsby"
import React, { ReactNode, useContext } from "react"
import styled from "styled-components"
import { ThemeManagerContext } from "../contexts/ThemeManager"
import { rhythm, styledScale } from "../utils/typography"
import { FadeLink } from "./link"

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const MainHeading = styled.h1`
  font-family: Montserrat, serif;
  ${styledScale(1.2)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
  color: rgb(${props => props.theme.palette.mainBrand});

  @media (max-width: 771px) {
    ${styledScale(0.75)};
    margin-bottom: 0;
  }

  @media (max-width: 467px) {
    ${styledScale(0.5)};
    margin-bottom: 0;
  }
`

const SubHeading = styled.h2`
  font-family: Montserrat, serif;
  margin-bottom: ${rhythm(2)};
  color: rgb(${props => props.theme.palette.mainBrand});
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
  padding: ${`${rhythm(1.5)} ${rhythm(3 / 4)}`};
`

const StyledFooter = styled.footer`
  margin-top: ${rhythm(4)};
  text-align: center;
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
    align-items: baseline;
    margin-bottom: ${rhythm(1.5)};
  }
`

export const Layout = (props: Props) => {
  const { location, title, children } = props
  const rootPath = `/`

  const HeaderTitle = location.pathname === rootPath ? MainHeading : SubHeading

  const themeContext = useContext(ThemeManagerContext)

  return (
    <Content>
      <StyledHeader>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
        <ColorSwitchWrapper>
          <label>
            <input
              type="checkbox"
              onChange={() => themeContext.toggleDark()}
              checked={themeContext.isDark}
            />{" "}
            Dark mode
          </label>
        </ColorSwitchWrapper>
      </StyledHeader>
      <main>{children}</main>
      <StyledFooter>
        <FadeLink to={`/contact`}>inquiries</FadeLink>
      </StyledFooter>
    </Content>
  )
}
