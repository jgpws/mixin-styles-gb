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
      './build/assets/css/theme/base-styles.css',
      './build/assets/css/theme/layout.css',
      './build/assets/css/theme/blocks.css',
      './build/assets/css/editor-overrides.css',
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

// Block Styles/Variations
function mixin_styles_gb_editor_assets() {
	wp_enqueue_script( 'mixin-styles-gb-block-styles', get_theme_file_uri( 'build/assets/js/block-styles.js' ), array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-i18n' ), filemtime( get_template_directory() . '/build/assets/js/block-styles.js' ), true );
	wp_enqueue_script( 'mixin-styles-gb-block-variations', get_theme_file_uri( 'build/assets/js/block-variations.js' ), array( 'wp-blocks', 'wp-dom-ready', 'wp-element', 'wp-primitives', 'wp-i18n' ), filemtime( get_template_directory() . '/build/assets/js/block-variations.js' ), true );
}

  $script_asset = include get_parent_theme_file_path( 'build/assets/js/editor.asset.php' );
  wp_enqueue_script( 'mixin-styles-gb-editor-scripts', get_parent_theme_file_uri( '/build/assets/js/editor.js' ), $script_asset['dependencies'], $script_asset['version'], true );
add_action( 'enqueue_block_editor_assets', 'mixin_styles_gb_editor_assets' );

function mixin_styles_gb_scripts() {
  $base_style_asset = include get_parent_theme_file_path( 'build/assets/css/theme/base-styles.asset.php' );
  $layout_style_asset = include get_parent_theme_file_path( 'build/assets/css/theme/layout.asset.php' );
  $blocks_style_asset = include get_parent_theme_file_path( 'build/assets/css/theme/blocks.asset.php' );
  $animations_style_asset = include get_parent_theme_file_path( 'build/assets/css/theme/animations.asset.php' );

  // Stylesheets
  wp_enqueue_style( 'mixin-styles-gb-style', get_stylesheet_uri() );
  wp_enqueue_style( 'mixin-styles-gb-base', get_theme_file_uri( 'build/assets/css/theme/base-styles.css' ), $base_style_asset['dependencies'], $base_style_asset['version'] );
  wp_enqueue_style( 'mixin-styles-gb-layout', get_theme_file_uri( 'build/assets/css/theme/layout.css' ), $layout_style_asset['dependencies'], $layout_style_asset['version'] );
  wp_enqueue_style( 'mixin-styles-gb-blocks', get_theme_file_uri( 'build/assets/css/theme/blocks.css' ), $blocks_style_asset['dependencies'], $blocks_style_asset['version'] );
  wp_enqueue_style( 'mixin-styles-gb-animations', get_theme_file_uri( 'build/assets/css/theme/animations.css' ), $animations_style_asset['dependencies'], $animations_style_asset['version'] );
  
  // Scripts
  wp_enqueue_script( 'mixin-styles-gb-scripts', get_theme_file_uri( 'build/assets/js/mixin-styles-gb-scripts.js' ), array(), filemtime( get_template_directory() . '/assets/js/mixin-styles-gb-scripts.js' ), true );
  wp_enqueue_script( 'mixin-styles-gb-contrast-script', get_theme_file_uri( 'build/assets/js/mixin-styles-gb-contrast.js' ), array(), filemtime( get_template_directory() . '/assets/js/mixin-styles-gb-contrast.js' ), true );
}
add_action( 'wp_enqueue_scripts', 'mixin_styles_gb_scripts' );

/* 
 * Enqueue per block stylesheets.
 * see Exploring Per-Block Stylesheets in Block Themes by Nick Diego
 * https://wpengine.com/builders/per-block-stylesheets/
 *
 * For development purposes, please remove the .min part of each .css reference in both foreach statements.
 * This is in order to see changes made to the theme.
 * Run 'npm run develop' on the command line from the location
 * the theme is installed to make css/JavaScript changes.
 * Then run 'npm run produce' to re-minify each file.
 * Afterwards, restore the .min prefix in each foreach statement.
 */
function mixin_styles_gb_enqueue_block_styles() {
	
	$block_namespaces = glob( dirname( __FILE__ ) . '/build/assets/block-css/*/' );
	$block_namespaces = array_map(
		function( $type_path ) { return basename( $type_path ); },
		$block_namespaces
	);
	
	foreach ( $block_namespaces as $block_namespace ) {
	
		$block_styles = glob( dirname( __FILE__ ) . '/build/assets/block-css/' . $block_namespace . '/*.css' );
		$block_styles = array_map(
			function( $styles_path ) { return basename( $styles_path, '.css' ); },
			$block_styles
		);
		
		foreach ( $block_styles as $block_style ) {
			
			wp_enqueue_block_style(
				/*
				 * $block_namespace = A namespace such as core in core/blockname
				 * $block_style = the name of a registered block; CSS file must be named after the block.
				 */
				$block_namespace . '/' . $block_style,
				array(
					'handle' => 'mixin-styles-gb-' . $block_namespace . '-' . $block_style . '-styles',
					'src' => get_theme_file_uri( 'build/assets/block-css/' . $block_namespace . '/' . $block_style . '.css' ),
					'path' => get_theme_file_uri( 'build/assets/block-css/' . $block_namespace . '/' . $block_style . '.css' ),
				),
			);
		}
	}
}

add_action( 'after_setup_theme', 'mixin_styles_gb_enqueue_block_styles' );
