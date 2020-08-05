import React from "react"
import { ProviderWrapper } from "./src/contexts/ProviderWrapper"
import { GlobalStyleWithTheme } from "./src/components/layout"

export const wrapRootElement = ({ element }) => (
  <ProviderWrapper>{element}</ProviderWrapper>
)

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <GlobalStyleWithTheme />
      {element}
    </>
  )
}
