import { graphql, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Query, SitePageContext } from "../graphql-types"
import { rhythm } from "../utils/typography"

const Title = styled.h3`
  font-family: Montserrat, serif;
  margin-bottom: ${rhythm(1 / 4)};
  margin-top: ${rhythm(2)};
`

const AboutMe = styled.div`
  margin-top: ${rhythm(3.5)};
`

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query & { me: any } & { mantra: any }
}

const About = (props: Props) => {
  const siteTitle = props.data!.site!.siteMetadata!.title!
  const mantra = props.data!.mantra!
  const me = props.data!.me!

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="About Me"
        keywords={[`about`, `mantra`, `personal`, `programming`]}
      />
      <div>
        <Title>{mantra.frontmatter!.title!}</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: mantra.html!,
          }}
        />
      </div>
      <AboutMe>
        <div
          dangerouslySetInnerHTML={{
            __html: me.html!,
          }}
        />
      </AboutMe>
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
    mantra: markdownRemark(frontmatter: { title: { eq: "Developer Mantra" } }) {
      html
      frontmatter {
        title
      }
    }
    me: markdownRemark(frontmatter: { title: { eq: "Me" } }) {
      html
    }
  }
`
