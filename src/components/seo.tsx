/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Helmet from "react-helmet"

interface Meta {
  name: string
  content: string
}

interface Props {
  title: string
  lang?: string
  meta?: Meta[]
  keywords?: string[]
  description?: string
  image?: string
  slug?: string | null
}

export const SEO = (props: Props) => {
  const lang = props.lang || "en"
  const meta = props.meta || []
  const keywords = props.keywords || []

  const { avatar, site } = useStaticQuery(
    graphql`
      query {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = props.description || site.siteMetadata.description
  const image = props.image || avatar.childImageSharp.fixed
  const url = props.slug
    ? `${site.siteMetadata.siteUrl}/${props.slug}/`
    : site.siteMetadata.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={props.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          content: metaDescription,
          name: `description`,
        },
        {
          content: props.title,
          property: `og:title`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: url,
          property: `og:url`,
        },
        {
          content: image,
          name: "image",
        },
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: site.siteMetadata.author,
          name: `twitter:creator`,
        },
        {
          content: props.title,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
      ]
        .concat({ content: keywords.join(`, `), name: `keywords` })
        .concat(meta)}
    />
  )
}
