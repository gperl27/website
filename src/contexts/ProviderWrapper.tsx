import React, { ReactNode } from "react"
import styled from "styled-components"
import { ModalProvider } from "styled-react-modal"
import { StyledThemeProvider } from "./StyledThemeProvider"
import { ThemeManagerProvider } from "./ThemeManager"

const StyledRoot = styled.div`
  height: 100%;
`

interface Props {
  children: ReactNode
}

export const ProviderWrapper = (props: Props) => (
  <StyledRoot>
    <ThemeManagerProvider>
      <StyledThemeProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </StyledThemeProvider>
    </ThemeManagerProvider>
  </StyledRoot>
)
