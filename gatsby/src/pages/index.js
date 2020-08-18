import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { BlogTile } from "../components/BlogTile"

const IndexPage = ({ data }) => {
  const { heroText, heroImage } = data.wpPage.homepageMetaboxes
  return (
    <Layout>
      <SEO seo={data.wpPage.seo} path={"/"} />
      <div style={{ position: "relative" }}>
        <Img
          style={{ width: "100%" }}
          fixed={heroImage.localFile.childImageSharp.fixed}
          alt=""
        />
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
            backgroundColor: "#ffffffaa",
            padding: "1rem",
            width: "24rem",
          }}
        >
          {heroText}
        </h1>
      </div>
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
              key={node.uri}
              author={node.author.node.name}
              date={node.date}
              excerpt={node.excerpt}
              title={node.title}
              link={node.uri}
              fixedImage={
                node.featuredImage.node.localFile.childImageSharp.fixed
              }
            />
          )
        })}
      </div>
    </Layout>
  )
}
export default IndexPage

export const query = graphql`
  query {
    wpPage(pageTemplate: { eq: "page-templates/homepage.php" }) {
      homepageMetaboxes {
        heroText
        heroImage {
          localFile {
            childImageSharp {
              fixed(width: 920, height: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      seo {
        metaDesc
        opengraphDescription
        opengraphTitle
        opengraphType
        title
      }
    }
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
