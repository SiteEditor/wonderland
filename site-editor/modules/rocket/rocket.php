<?php
/*
Module Name: Rocket
Module URI: http://www.siteeditor.org/modules/rocket
Description: Module Rocket For Page Builder Application
Author: Site Editor Team
Author URI: http://www.siteeditor.org
Version: 1.0.0
*/

/**
 * Class PBRocketShortcode
 */
class PBRocketShortcode extends PBShortcodeClass{

    /**
     * Register module with siteeditor.
     */
    function __construct() {

        parent::__construct( array(
                "name"        => "sed_rocket_animate",                               //*require
                "title"       => __("Rocket","site-editor"),                 //*require for toolbar
                "description" => __("Rocket Animation Module","site-editor"),
                "icon"        => "icon-rocket",                               //*require for icon toolbar
                "module"      =>  "rocket"         //*require
                //"is_child"    =>  "false"       //for childe shortcodes like sed_tr , sed_td for table module
            ) // Args
        );

    }

    function get_atts(){

        $atts = array(
            'show_title'                    => true,
        );

        return $atts;

    }

    function add_shortcode( $atts , $content = null ){

        extract( $atts );

    }
    
    function styles(){
        return array(
            array('rocket-skin-default', get_stylesheet_directory_uri().'/site-editor/modules/rocket/skins/default/css/style.css' ,'1.0.0' ) ,
            array('rocket-skin-skin1', get_stylesheet_directory_uri().'/site-editor/modules/rocket/skins/skin1/css/style.css' ,'1.0.0' ) ,
            array('rocket-skin-skin2', get_stylesheet_directory_uri().'/site-editor/modules/rocket/skins/skin2/css/style.css' ,'1.0.0' ) ,
            array('rocket-skin-skin3', get_stylesheet_directory_uri().'/site-editor/modules/rocket/skins/skin3/css/style.css' ,'1.0.0' ) ,
            array('rocket-skin-skin4', get_stylesheet_directory_uri().'/site-editor/modules/rocket/skins/skin4/css/style.css' ,'1.0.0' ) ,
        );
    } 

    function shortcode_settings(){

        $this->add_panel( 'rocket_settings_panel' , array(
            'title'               =>  __('Rocket Settings',"site-editor")  ,
            'capability'          => 'edit_theme_options' ,
            'type'                => 'inner_box' ,
            'priority'            => 9 ,
            'btn_style'           => 'menu' ,
            'has_border_box'      => false ,
            'icon'                => 'sedico-setting' ,
            'field_spacing'       => 'sm'
        ) );

        $params = array();

        $params['sed_shortcode_content'] = array(
            'label'             => __('Ads Paragraph', 'site-editor'),
            'type'              => 'code',
            'priority'          => 10,
            'default'           => "",
            'js_params' => array(
                "mode" => "html",
            ),
            'panel'               => 'rocket_settings_panel',
        );

        $params['skin'] = array(
            "type"                => "skin" ,
            "label"               => __("Change skin", "site-editor"),
            'button_style'        => 'menu' ,
            'has_border_box'      => false ,
            'icon'                => 'sedico-change-skin' ,
            'field_spacing'       => 'sm' ,
            'priority'            => 540
        );

        $params['animation'] =  array(
            "type"                => "animation" ,
            "label"               => __("Animation Settings", "site-editor"),
            'button_style'        => 'menu' ,
            'has_border_box'      => false ,
            'icon'                => 'sedico-animation' ,
            'field_spacing'       => 'sm' ,
            'priority'            => 530 ,
        );

        $params['row_container'] = array(
            'type'          => 'row_container',
            'label'         => __('Module Wrapper Settings', 'site-editor')
        );

        return $params;

    }

}

new PBRocketShortcode();

global $sed_pb_app;                      

$sed_pb_app->register_module(array(
    "group"                 =>  "basic" ,
    "name"                  =>  "rocket",
    "title"                 =>  __("Rocket","site-editor"),
    "description"           =>  __("List of rocket for built-in and custom post types","site-editor"),
    "icon"                  =>  "icon-rocket",
    "type_icon"             =>  "font",
    "shortcode"             =>  "sed_rocket_animate",
    //"priority"              =>  10 ,
    "tpl_type"              => "underscore"
));


