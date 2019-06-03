import { PageRendererProps } from "gatsby"
import React from "react"
import { Query, SitePageContext } from "../graphql-types"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const Resume = (props: Props) => {
  return <h1>hello world</h1>
}

export default Resume
