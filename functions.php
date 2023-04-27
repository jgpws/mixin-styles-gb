<?php

if ( ! function_exists( 'mixin_styles_gb_setup' ) ) :
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which runs
   * before the init hook. The init hook is too late for some features, such as indicating
   * support post thumbnails.
   */

   function mixin_styles_gb_setup() {
    /* for theme localization */
    load_theme_textdomain( 'mixin-styles-gb', get_template_directory_uri() . '/languages' );

    /**
     * Add HTML5 support for classic theme features.
     */
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'gallery', 'caption' ) );

    /**
     * Add default posts and comments RSS feed links to <head>.
     */
    add_theme_support( 'automatic-feed-links' );

    /**
     * Responsive videos.
     */
    add_theme_support( 'responsive-embeds' );

    /**
     * Enable support for post thumbnails and featured images.
     */
    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'align-wide' );

    /**
     * Add support for editor styles.
     */
		add_theme_support( 'editor-styles' );

    /**
     * Enqueue editor styles.
     */
		add_editor_style( array(
      './assets/css/base-styles.css',
      './assets/css/blocks.css',
      './assets/css/block-colors.css',
      './assets/css/block-button-colors.css',
      './assets/css/block-navigation-colors.css',
      './assets/css/editor-overrides.css',
    ) );
  }
endif;
add_action( 'after_setup_theme', 'mixin_styles_gb_setup' );

// Add block pattern categories
function mixin_styles_gb_register_block_pattern_cats() {
	if( function_exists( 'register_block_pattern_category' ) ) {
   	// Add new block pattern category for this theme.
   	register_block_pattern_category(
      	'mixin-styles-gb',
      	array( 'label' => esc_html__( 'Mixin Styles- GB', 'mixin-styles-gb' ) )
   	);
   }
}

add_action( 'init', 'mixin_styles_gb_register_block_pattern_cats' );

function mixin_styles_gb_block_styles() {
	wp_enqueue_script( 'mixin-styles-gb-block-styles', get_theme_file_uri( '/js/block-styles.js' ), array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ), filemtime( get_template_directory() . '/js/blocks-styles.js' ) );
}
add_action( 'enqueue_block_editor_assets', 'mixin_styles_gb_block_styles' );

function mixin_styles_gb_scripts() {
  // Stylesheets
  wp_enqueue_style( 'mixin-styles-gb-style', get_stylesheet_uri() );
  wp_enqueue_style( 'mixin-styles-gb-base', get_theme_file_uri( '/assets/css/base-styles.css' ), array(), filemtime( get_template_directory() . '/assets/css/base-styles.css' ) );
  wp_enqueue_style( 'mixin-styles-gb-blocks', get_theme_file_uri( '/assets/css/blocks.css' ), array(), filemtime( get_template_directory() . '/assets/css/blocks.css' ) );
  wp_enqueue_style( 'mixin-styles-gb-block-color-overrides', get_theme_file_uri( '/assets/css/block-colors.css' ), array( 'mixin-styles-gb-blocks' ), filemtime( get_template_directory() . '/assets/css/block-colors.css' ) );
  wp_enqueue_style( 'mixin-styles-bg-nav-color-overrides', get_theme_file_uri( '/assets/css/block-navigation-colors.css' ), array( 'mixin-styles-gb-blocks' ), filemtime( get_template_directory() . '/assets/css/block-navigation-colors.css' ) );
  wp_enqueue_style( 'mixin-styles-gb-button-color-overrides', get_theme_file_uri( '/assets/css/block-button-colors.css' ), array( 'mixin-styles-gb-blocks' ), filemtime( get_template_directory() . '/assets/css/block-button-colors.css' ) );
  wp_enqueue_style( 'mixin-styles-gb-button-gradient-overrides', get_theme_file_uri( '/assets/css/block-button-gradients.css' ), array( 'mixin-styles-gb-blocks' ), filemtime( get_template_directory() . '/assets/css/block-button-gradients.css' ) );
  
  // Scripts
  wp_enqueue_script( 'mixin-styles-gb-scripts', get_theme_file_uri( '/js/mixin-styles-gb-scripts.js' ), array(), filemtime( get_template_directory() . '/js/mixin-styles-gb-scripts.js' ), true );
}
add_action( 'wp_enqueue_scripts', 'mixin_styles_gb_scripts' );
