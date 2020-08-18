import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { BlogTile } from "../components/BlogTile"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}
    >
      {data.allWpPost.nodes.map(node => {
        return (
          <BlogTile
            author={node.author.node.name}
            date={node.date}
            excerpt={node.excerpt}
            title={node.title}
            link={node.uri}
            fixedImage={node.featuredImage.node.localFile.childImageSharp.fixed}
          />
        )
      })}
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allWpPost(
      filter: { status: { eq: "publish" } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        author {
          node {
            name
          }
        }
        excerpt
        title
        status
        uri
        date(locale: "pl", fromNow: true)
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fixed(width: 400, height: 400) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
