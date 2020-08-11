<?php
add_action('cmb2_init', 'cmb2_homepage_metaboxes');
function cmb2_homepage_metaboxes()
{
    $cmb = new_cmb2_box(array(
        'id' => 'metabox_homepage',
        'title' => __('Metabox', 'cmb2') ,
        'object_types' => array(
            'page',
        ) , // Post type
        'show_on' => array(
            'key' => 'page-template',
            'value' => 'page-templates/homepage.php'
        ) ,
        'context' => 'normal',
        'priority' => 'high',
        'show_names' => true, // Show field names on the left
        'show_in_rest' => WP_REST_Server::READABLE, 
    ));

    // Hero Section
    $cmb->add_field(array(
        'name' => 'Hero Image',
        'id' => 'heroImage',
        'type' => 'file',
    ));
    $cmb->add_field(array(
        'name' => 'Hero title',
        'id' => 'heroTitle',
        'type' => 'text',
    ));

    $cmb_group1 = $cmb->add_field(array(
        'id' => 'whyMe',
        'type' => 'group',
        'options' => array(
            'group_title' => __('Reason {#}', 'cmb2') ,
            'add_button' => __('Add another reason', 'cmb2') ,
            'remove_button' => __('Delete reason', 'cmb2') ,
            'sortable' => true,
        ) ,

    ));
    $cmb->add_group_field($cmb_group1, array(
        'name' => 'Image',
        'id' => 'image',
        'type' => 'file',
    ));
    $cmb->add_group_field($cmb_group1, array(
        'name' => 'Text',
        'id' => 'text',
        'type' => 'text',
    ));
}

