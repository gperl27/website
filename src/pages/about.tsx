import { graphql, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Query, SitePageContext } from "../graphql-types"
import { rhythm, styledScale } from "../utils/typography"

const Title = styled.h3`
  ${styledScale(0.85)};
  font-family: Montserrat, serif;
  margin-bottom: ${rhythm(1 / 4)};
  margin-top: ${rhythm(2)};
`

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const About = (props: Props) => {
  const siteTitle = props.data!.site!.siteMetadata!.title!
  const html = props.data!.markdownRemark!.html!
  const title = props.data!.markdownRemark!.frontmatter!.title!

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="About Me"
        keywords={[`about`, `mantra`, `personal`, `programming`]}
      />
      <div>
        <Title>{title}</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query AboutContent {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { title: { eq: "Developer Mantra" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
