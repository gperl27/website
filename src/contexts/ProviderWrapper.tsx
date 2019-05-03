import React, { ReactNode } from "react"
import styled from "styled-components"
import { ModalProvider } from "styled-react-modal"
import { StyledTheme } from "./StyledTheme"
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
      <StyledTheme>
        <ModalProvider>{props.children}</ModalProvider>
      </StyledTheme>
    </ThemeManagerProvider>
  </StyledRoot>
)
