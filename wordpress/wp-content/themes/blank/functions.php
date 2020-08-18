<?php

add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

// Add CircleCI badge
$ciUrl = '';
$ciToken = '';
add_action( 'admin_bar_menu', 'add_circle_ci_badge',999 );
function add_circle_ci_badge($admin_bar) {
          $args = array(
                'id'     => 'CircleCI',
                'title'  => '<img style="padding: 6px 0" src="' . $ciUrl . '.svg?style=svg&circle-token=' . $ciToken . '" alt=""/>',
                'href'   => $ciUrl,
                'meta'   => false
            );
            $admin_bar->add_node( $args );
}

register_nav_menus( array(
	'header' => 'Header',
));

add_action( 'init', 'register_custom_post_types' );
function register_custom_post_types() {
    $args = array(
        'public'    => true,
        'label'     => 'Projects',
        'menu_icon' => 'dashicons-feedback',
        'show_in_rest' => true,
    );
    register_post_type( 'project', $args );
}

add_action( 'init', 'register_custom_taxonomies' );
function register_custom_taxonomies() {

    $labels = array(
        'name'              => 'Project categories',
        'singular_name'     => 'Project category',
        'search_items'      => 'Search Project categories',
        'all_items'         => 'All Project categories',
        'edit_item'         => 'Edit Project category',
        'update_item'       => 'Update Project category',
        'add_new_item'      => 'Add New Project category',
        'menu_name'         => 'Project categories',
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'sort' => true,
        'args' => array( 'orderby' => 'term_order' ),
        'show_admin_column' => true,
        'show_in_rest' => true,
    );

    register_taxonomy( 'project-taxonomy', array( 'project' ), $args);

}

// API endpoints
add_action('admin_post_nopriv_add_two_numbers', 'add_two_numbers');
add_action('admin_post_add_two_numbers', 'add_two_numbers');
function add_two_numbers() {
    $numberOne = $_POST['numberOne'];
    $numberTwo = $_POST['numberTwo'];
    if($numberOne && $numberTwo){
        echo json_encode(array('success' => true, 'data' => $numberOne + $numberTwo));
    }else{
        echo json_encode(array('success' => false, 'data' => 'Did not provide numberOne or numberTwo'));
    }
    return 0;
}
