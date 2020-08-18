const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`src/templates/article.js`)
  const postsData = await graphql(`
    query {
      allWpPost {
        nodes {
          author {
            node {
              name
            }
          }
          title
          status
          date(locale: "pl", fromNow: true)
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fixed(width: 400, height: 400) {
                    base64
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
            }
          }
          uri
          content
          seo {
            metaDesc
            opengraphDescription
            opengraphTitle
            opengraphType
            title
          }
        }
      }
    }
  `)

  postsData.data.allWpPost.nodes.forEach(node => {
    createPage({
      path: `${node.uri}`,
      component: articleTemplate,
      context: {
        data: node,
      },
    })
  })
}
