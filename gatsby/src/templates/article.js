import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = ({ pageContext }) => {
  const { title, excerpt } = pageContext.data
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: excerpt }}></p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Article
