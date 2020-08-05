import React, { ReactNode } from "react"
import styled from "styled-components"
import { ModalProvider } from "styled-react-modal"
import { LoadingProvider } from "./LoadingContext"

const StyledRoot = styled.div`
  height: 100%;
`

interface Props {
  children: ReactNode
}

export const ProviderWrapper = (props: Props) => {
  return (
    <LoadingProvider>
      <StyledRoot>
        <ModalProvider>{props.children}</ModalProvider>
      </StyledRoot>
    </LoadingProvider>
  )
}
