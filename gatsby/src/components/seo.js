/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ seo, path, meta = [] }) {
  const {
    metaDesc,
    opengraphDescription,
    opengraphTitle,
    opengraphType,
    title,
  } = seo
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            lang
          }
        }
      }
    `
  )
  const url = site.siteMetadata.url + path
  const metaDescription =
    metaDesc || opengraphDescription || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: opengraphTitle,
        },
        {
          property: `og:description`,
          content: opengraphDescription,
        },
        {
          property: `og:type`,
          content: opengraphType,
        },
        { property: `og:url`, content: url },
      ].concat(meta)}
    />
  )
}

export default SEO
