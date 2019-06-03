// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-tomorrow.css"

import React from "react"
import { ProviderWrapper } from "./src/contexts/ProviderWrapper"

export const wrapRootElement = ({ element }) => (
  <ProviderWrapper>
    {element}
  </ProviderWrapper>
)
