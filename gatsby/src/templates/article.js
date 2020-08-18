import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = ({ pageContext }) => {
  const { title, content, featuredImage } = pageContext.data
  return (
    <Layout>
      <SEO title={title} />
      <Img fixed={featuredImage.node.localFile.childImageSharp.fixed} />
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Article
