<?php
//
// Recommended way to include parent theme styles.
//  (Please see http://codex.wordpress.org/Child_Themes#How_to_Create_a_Child_Theme)
//

function wonderland_enqueue_styles() {

    wp_enqueue_style( 'wonderland-parent-style', get_template_directory_uri() . '/style.css' );

    wp_enqueue_style( 'wonderland-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style')
    );
    /**
     * Theme Front end main js
     */
    wp_enqueue_script( "wonderland-script" , get_stylesheet_directory_uri() . '/assets/js/script.js' , array( 'jquery', 'carousel' , 'sed-livequery' , 'jquery-ui-accordion' , 'jquery-ui-tabs' ) , "1.0.0" , true );

    //wp_enqueue_script('sed-masonry');

    wp_enqueue_script('lightbox');

    wp_enqueue_script('jquery-scrollbar');

    wp_enqueue_style('custom-scrollbar');

    wp_enqueue_style("carousel");

    wp_enqueue_style("lightbox");

}

add_action( 'wp_enqueue_scripts', 'wonderland_enqueue_styles' , 0 );

add_action( 'after_setup_theme', 'sed_wonderland_theme_setup' );

function sed_wonderland_theme_setup() {

    load_child_theme_textdomain( 'wonderland', get_stylesheet_directory() . '/languages' );

    remove_filter( 'excerpt_more', 'twentyseventeen_excerpt_more' );

    /**
     * Short Description (excerpt).
     */
    add_filter( 'wonderland_short_description', 'wptexturize' );
    add_filter( 'wonderland_short_description', 'convert_smilies' );
    add_filter( 'wonderland_short_description', 'convert_chars' );
    add_filter( 'wonderland_short_description', 'wpautop' );
    add_filter( 'wonderland_short_description', 'shortcode_unautop' );
    add_filter( 'wonderland_short_description', 'prepend_attachment' );
    add_filter( 'wonderland_short_description', 'do_shortcode', 11 ); // AFTER wpautop()

    // This theme uses wp_nav_menu() in two locations.
    register_nav_menus( array(
        'services'    => __( 'Services Menu', 'twentyseventeen' ),
    ) );

}

function wonderland_excerpt_more( $link ) {
    if ( is_admin() ) {
        return $link;
    }

    return ' &hellip; ';
}
add_filter( 'excerpt_more', 'wonderland_excerpt_more' );

function wonderland_excerpt_length( $length ) {
    return 650;
}

add_filter( 'excerpt_length', 'wonderland_excerpt_length', 999 );

/**
 * Add Site Editor Modules
 *
 * @param $modules
 * @return mixed
 */
function sed_wonderland_add_modules( $modules ){

    global $sed_pb_modules;

    $module_name = "themes/wonderland/site-editor/modules/posts/posts.php";
    $modules[$module_name] = $sed_pb_modules->get_module_data(get_stylesheet_directory() . '/site-editor/modules/posts/posts.php', true, true);

    //$module_name = "themes/wonderland/site-editor/modules/wonderland-products/wonderland-products.php";
    //$modules[$module_name] = $sed_pb_modules->get_module_data(get_stylesheet_directory() . '/site-editor/modules/wonderland-products/wonderland-products.php', true, true);
    
    $module_name = "themes/wonderland/site-editor/modules/in-btn-back/in-btn-back.php";
    $modules[$module_name ] = $sed_pb_modules->get_module_data(get_stylesheet_directory() . '/site-editor/modules/in-btn-back/in-btn-back.php', true, true);
    
    
    $module_name = "themes/wonderland/site-editor/modules/vertical-header/vertical-header.php";
    $modules[$module_name ] = $sed_pb_modules->get_module_data(get_stylesheet_directory() . '/site-editor/modules/vertical-header/vertical-header.php', true, true);

    
    $module_name = "themes/wonderland/site-editor/modules/subscription/subscription.php";
    $modules[$module_name ] = $sed_pb_modules->get_module_data(get_stylesheet_directory() . '/site-editor/modules/subscription/subscription.php', true, true);     
    
    return $modules;

}

add_filter("sed_modules" , "sed_wonderland_add_modules" );



function wonderland_register_theme_fields( $fields ){

    $fields['products_archive_description'] = array(
        'type'              => 'textarea',
        'label'             => __('Product Archive Description', 'site-editor'),
        //'description'       => '',
        'transport'         => 'postMessage' ,
        'setting_id'        => 'wonderland_products_archive_description',
        'default'           => '',
        "panel"             => "general_settings" ,
    );

    $fields['home_page_products_description'] = array(
        'type'              => 'textarea',
        'label'             => __('Home Page Product Description', 'site-editor'),
        //'description'       => '',
        'transport'         => 'postMessage' ,
        'setting_id'        => 'wonderland_home_page_products_description',
        'default'           => '',
        "panel"             => "general_settings" ,
    );

    $locale = get_locale();

    if( $locale == 'fa_IR' ) {

        $fields['english_site_url'] = array(
            'type' => 'text',
            'label' => __('English Site Url', 'site-editor'),
            //'description'       => '',
            'transport' => 'postMessage',
            'setting_id' => 'wonderland_english_site_url',
            'default' => 'http://eng.wonderland.com',
            "panel" => "general_settings",
        );

    }

    $fields[ 'intro_logo' ] = array(
        'setting_id'        => 'wonderland_intro_logo',
        'label'             => __('Intro Logo', 'translation_domain'),
        'type'              => 'image',
        //'priority'          => 10,
        'default'           => '',
        'transport'         => 'postMessage' ,
        'panel'             =>  'general_settings'
    );

    return $fields;

}

//add_filter( "sed_theme_options_fields_filter" , 'wonderland_register_theme_fields' , 10000 );


//add_action( 'pre_get_posts', 'wonderland_per_page_query' );
/**
 * Customize category query using pre_get_posts.
 *
 * @author     FAT Media <http://youneedfat.com>
 * @copyright  Copyright (c) 2013, FAT Media, LLC
 * @license    GPL-2.0+
 * @todo       Change prefix to theme or plugin prefix
 *
 */
function wonderland_per_page_query( $query ) {

    $taxonomy = is_tax() ? get_queried_object()->taxonomy:"";

    $is_taxonomy = in_array( $taxonomy , array( 'product-category'  ) );

    if ( $query->is_main_query() && ! $query->is_feed() && ! is_admin() && $is_taxonomy  ) {
        $query->set( 'posts_per_page', '6' ); //Change this number to anything you like.
    }

    $post_type = $query->get('post_type');

    $is_post_type = in_array( $post_type , array( 'product' , 'project' ) );

    if ( $query->is_main_query() && ! $query->is_feed() && ! is_admin() && $is_post_type && is_post_type_archive() ) {
        $query->set( 'posts_per_page', '6' ); //Change this number to anything you like.
    }

    $is_post_type = in_array( $post_type , array( 'service' ) );

    if ( $query->is_main_query() && ! $query->is_feed() && ! is_admin() && $is_post_type && is_post_type_archive() ) {
        $query->set( 'posts_per_page', '80' ); //Change this number to anything you like.
    }

}

function wonderland_one_click_checkout(){

    if( !is_admin() && isset( $_REQUEST['wonderland_quick_checkout'] ) && $_REQUEST['wonderland_quick_checkout'] == 1 && isset( $_REQUEST['add_to_cart'] ) ){

        $product_id = (int)$_REQUEST['add_to_cart'];

        WC()->cart->empty_cart();

        WC()->cart->add_to_cart( $product_id );

        $wo_checkout_url = WC()->cart->get_checkout_url();

        wp_safe_redirect( $wo_checkout_url );

        exit();

    }

}

add_action( 'wp_loaded' , 'wonderland_one_click_checkout' );


function wonderland_add_google_font( $google_fonts ){

    $google_fonts["David Libre"] = "David Libre";

    return $google_fonts;

}

add_filter( 'sed_google_fonts_filter' , 'wonderland_add_google_font' );

/**
 * Site Editor Shop WooCommerce
 */
require dirname(__FILE__) . '/inc/woocommerce.php';


