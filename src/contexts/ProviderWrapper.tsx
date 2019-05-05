import React, { ReactNode } from "react"
import styled from "styled-components"
import { ModalProvider } from "styled-react-modal"

const StyledRoot = styled.div`
  height: 100%;
`

interface Props {
  children: ReactNode
}

export const ProviderWrapper = (props: Props) => (
  <StyledRoot>
    <ModalProvider>{props.children}</ModalProvider>
  </StyledRoot>
)
