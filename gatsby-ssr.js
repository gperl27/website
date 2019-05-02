import { ModalProvider } from "styled-react-modal"
import React from "react"

export const wrapRootElement = ({ element }) => (
  <ModalProvider>
    {element}
  </ModalProvider>
)
