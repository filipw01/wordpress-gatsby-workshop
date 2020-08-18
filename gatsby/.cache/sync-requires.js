const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/filip/projects/wordpress-gatsby-workshop/gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/filip/projects/wordpress-gatsby-workshop/gatsby/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/filip/projects/wordpress-gatsby-workshop/gatsby/src/pages/index.js"))),
  "component---src-templates-article-js": hot(preferDefault(require("/Users/filip/projects/wordpress-gatsby-workshop/gatsby/src/templates/article.js")))
}

