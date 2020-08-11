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

`CMB2` - handle metaboxes (alternatively `ACF`)

`WP Gatsby` - connect wordpress to gatsby

`WP GraphQL` - `WP Gatsby` dependency

`Yoast SEO` - manipulate meta tags

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

```
{
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
      content
    }
  }
}
```
