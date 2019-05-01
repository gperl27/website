import { PageRendererProps } from "gatsby"
import React, { ReactNode, useState } from "react"
import styled, { keyframes } from "styled-components"
import Modal from "styled-react-modal"
import { rhythm, styledScale } from "../utils/typography"
import { FadeLink } from "./link"

const ZoomIn = keyframes`
    from {
      transform: scale3d(.3, .3, .3);
    }
`

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`

const AnimatedModal = styled(StyledModal)<{ isOpen: boolean }>`
  animation-name: ${ZoomIn};
  animation-timing-function: cubic-bezier(0.4, 0, 0, 1.5);
  animation-duration: 0.3s;
  animation-delay: 0s;
`

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const StyledH1 = styled.h1`
  ${styledScale(1.5)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const StyledH3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
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

export const Layout = (props: Props) => {
  const [isShowing, setIsShowing] = useState(false)

  const { location, title, children } = props
  const rootPath = `/`

  const HeaderTitle = location.pathname === rootPath ? StyledH1 : StyledH3

  return (
    <Content>
      <header>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
      </header>
      <main>{children}</main>
      <footer>
        <a
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setIsShowing(true)
          }}
        >
          Inquiries
        </a>
        <AnimatedModal isOpen={isShowing} allowScroll={false}>
          <div>
            <span>I am a modal!</span>
            <button onClick={() => setIsShowing(false)}>Close me</button>
          </div>
        </AnimatedModal>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Content>
  )
}
