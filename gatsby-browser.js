// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import { ModalProvider } from "styled-react-modal"
import React from "react"
import styled from "styled-components"
import { ThemeManagerProvider } from "./src/contexts/ThemeManager"
import { StyledThemeProvider } from "./src/contexts/StyledThemeProvider"

const StyledRoot = styled.div`
  height: 100%;
`

export const wrapRootElement = ({ element }) => (
  <StyledRoot>
    <ThemeManagerProvider>
      <StyledThemeProvider>
        <ModalProvider>
          {element}
        </ModalProvider>
      </StyledThemeProvider>
    </ThemeManagerProvider>
  </StyledRoot>
)
