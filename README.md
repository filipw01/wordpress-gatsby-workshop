- [Initial state](#initial-state)
  - [Blank theme](#blank-theme)
    - [File structure](#file-structure)
  - [Plugins](#plugins)
- [Install Gatsby](#install-gatsby)

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

`WPGraphql Yoast Seo` - expose Yoast SEO to GraphQL API

# Install Gatsby

From project root directory run
`npx gatsby new gatsby`
