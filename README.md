- [Requirements](#requirements)
- [Initial state](#initial-state)
  - [Blank theme](#blank-theme)
    - [File structure](#file-structure)
  - [Plugins](#plugins)
- [Gatsby](#gatsby)
  - [Install](#install)
  - [Configure](#configure)
  - [Plugins](#plugins-1)
  - [How it works](#how-it-works)
  - [Integrate with Wordpress](#integrate-with-wordpress)
  - [Generate pages for posts](#generate-pages-for-posts)

# Requirements

- `docker` with `docker-compose`
- `node` with `npm` and preferably `npx`

# Initial state

Wordpress-dockerised initialized with blank theme, plugins and some data.

Username: `wordpress` Password: `wordpress`

## Blank theme

### File structure

`index.php` - always redirect to admin panel

`functions.php` - register API endpoints, menus, posts, taxonomies

`page-templates` - define page templates with comment to show in wordpress

`metaboxes` - register metaboxes for templates, remember to require in `metaboxes/metaboxes.php`

## Plugins

`JAMstack Deployments` - add webhook deploy button

`ACF` - handle metaboxes (for now `CMB2` needs more workaround)

`WPGraphQL for Advanced Custom Fields` - expose ACF to GraphQL API

`WP Gatsby` - connect wordpress to gatsby

`WP GraphQL` - `WP Gatsby` dependency

`Yoast SEO` - manipulate meta tags

`WPGraphql Yoast Seo` - expose Yoast SEO to GraphQL API

# Gatsby

## Install

From project root directory run `npx gatsby new gatsby`

Then from newly created `gatsby` folder run `npm run develop`

## Configure

Change `gatsby-config.js` to fit your needs

`pages` - files in this dir automatically create pages with `/filename` path

`gatsby-node.js` - allows to create dynamic pages based on data

## Plugins

`gatsby-plugin-react-helmet` - manipulates head of document

`gatsby-source-filesystem` - allows to query files from GraphQL

`gatsby-transformer-sharp` and `gatsby-plugin-sharp` - resize and transform images

`gatsby-plugin-manifest` - creates webapp manifest and favicon

`gatsby-image` - display image with many fallbacks, depends on `gatsby-transformer-sharp` and `gatsby-plugin-sharp`, is not included in `gatsby-config.js`

## How it works

Gatsby generates static HTML to be then rehydrated. Everything is written using React and JavaScript/TypeScript. Gatsby plugins really speed up process of delivering responsive images and many more. All data is processed and exposed as GraphQL API (available only for build process)

Even tho it is all JavaScript there are some limitations when using SSG. You cannot use JavaScript globals unless page is rehydrated. For example you can't use `window` unless you wrap it with `useEffect` to be fired after render.

## Integrate with Wordpress

Install [gatsby-source-wordpress-experimental](https://www.gatsbyjs.org/packages/gatsby-source-wordpress-experimental/) plugin

Run `npm i gatsby-source-wordpress-experimental`

Add

```js
{
  resolve: `gatsby-source-wordpress-experimental`,
  options: {
    url: `http://localhost:8000/graphql`
  },
},
```

Check if you can see the data in GraphiQL

## Generate pages for posts

Let's get familiar with GraphQL. This is our query for posts

```gql
{
  allWpPost(filter: {status: {eq: "publish"}}, sort: {fields: date, order: DESC}) {
    nodes {
      author {
        node {
          name
        }
      }
      title
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
    }
  }
}

```

In `gatsby-node.js` use 
```js
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const articleTemplate = path.resolve(`src/templates/article.js`)
  const postsData = await graphql(`
    /* Insert GraphQL query */
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
```

For template use 

```jsx
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
```

Clarify any doubts regarding React and JavaScript

Make sure `gatsby-image`, `Link`, `dangerouslySetInnerHTML`, `Layout` and `SEO` is clear.

Now create blog tiles on homepage with CSS modules

## Pull and handle data from Yoast SEO

First let's make Gatsby aware of WordPress page templates

Add this to your `functions.php`
```php
add_action('graphql_register_types', function () {
    register_graphql_field('Page', 'pageTemplate', [
        'type' => 'String',
        'description' => 'WordPress Page Template',
        'resolve' => function ($page) {
            return get_page_template_slug($page->pageId);
        },
    ]);
});
```

Now we can extend Homepage query 
```gql
wpPage(pageTemplate: {eq: "page-templates/homepage.php"}) {
    seo {
        metaDesc
        opengraphDescription
        opengraphTitle
        opengraphType
        title
    }
}
```

Handle received data in `SEO` component (perhaps `seo` and `path` props)

Do the same for generated article pages

## Pull and handle ACF data

There is a [bug](https://github.com/wp-graphql/wp-graphql-acf/issues/76) with custom fields for only some pages/posts.
So for now you have to add custom fields for whole post type.

Using `ACF` create metaboxes and show in GraphQL

## Setting up continuous deployment on CircleCI

Create `.circleci` directory in root and `config.yml` file in it with the following content
```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:10
    working_directory: ~/tech_blog/gatsby
    steps:
      - checkout:
          path: ~/tech_blog
      - restore_cache:
          keys:
            # Find a cache corresponding to this specific package-lock.json
            - v2-npm-deps-{{ checksum "package-lock.json" }}
            # Fallback cache to be used
            - v2-npm-deps-
      - run:
          name: Install Dependencies
          command: npm install
      - save_cache:
          key: v2-npm-deps-{{ checksum "package-lock.json" }}
          paths:
            - ./node_modules
      - run:
          name: Gatsby Build
          command: npm run build
      - run:
          name: Add ssh host
          command: ssh-keyscan -H $SSH_HOST >> ~/.ssh/known_hosts
      - run:
          name: Save wordpress admin panel
          command: ssh $SSH_USER@$SSH_HOST "cp -R /home/blueowlp/domains/techblog.com/public_html/admin /home/blueowlp/domains/techblog.com/tmp"
      - run:
          name: Save .htaccess
          command: ssh $SSH_USER@$SSH_HOST "cp -R /home/blueowlp/domains/techblog.com/public_html/.htaccess /home/blueowlp/domains/techblog.com/tmp"
      - run:
          name: Remove existing files
          command: ssh $SSH_USER@$SSH_HOST "rm -Rf /home/blueowlp/domains/techblog.com/public_html/*"
      - run:
          name: Restore wordpress admin panel
          command: ssh $SSH_USER@$SSH_HOST "mv /home/blueowlp/domains/techblog.com/tmp/admin /home/blueowlp/domains/techblog.com/public_html"
      - run:
          name: Restore .htaccess
          command: ssh $SSH_USER@$SSH_HOST "mv /home/blueowlp/domains/techblog.com/tmp/.htaccess /home/blueowlp/domains/techblog.com/public_html"
      - run:
          name: scp files
          command: scp -r public/* "$SSH_USER@$SSH_HOST:/home/blueowlp/domains/techblog.com/public_html/"
```

## My reflections

The old vs the new gatsby-source-wordpress plugin

### gatsby-source-wordpress (soon deprecated)

* Advantages
    * Easy to add CMB2 through REST API
    * Page templates working out of the box
* Drawbacks
    * Limited access to WordPress data - no settings, no users 
    * Rough and inconsistent API - returning prohibited empty string instead of null, images randomly returning null.
    I had to use custom normalizer function
    * Additional Plugins to show Menu, Yoast in REST and then manually handle it from endpoints

### gatsby-source-wordpress-experimental

* Advantages
    * Integration with menus, users, settings out of the box
    * Easy integration with Yoast SEO
    * Still receiving new functions
* Drawbacks
    * For now no way to easily integrate with CMB2 and limited integration with ACF
