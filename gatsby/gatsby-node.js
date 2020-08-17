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
                  id
                }
              }
            }
          }
          uri
          excerpt
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
