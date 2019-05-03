import React from "react"
import { ProviderWrapper } from "./src/contexts/ProviderWrapper"

export const wrapRootElement = ({ element }) => (
  <ProviderWrapper>
    {element}
  </ProviderWrapper>
)
