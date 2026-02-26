<?php
function mixin_styles_gb_register_block_styles() {
  register_block_style(
    'core/navigation',
    array(
      'name' => 'default',
      'label' => __( 'Default', 'mixin-styles-gb' ),
      'style_handle' => 'default',
      'is_default' => true
    )
  );

 register_block_style(
    'core/navigation', 
    array(
      'name' => 'tabs',
      'label' => __( 'Tabs', 'mixin-styles-gb' ),
    )
  );

  register_block_style(
    'core/navigation',
    array(
      'name' => 'wide-tab',
      'label' => __( 'Wide Tab', 'mixin-styles-gb' ),
    )
  );

  register_block_style(
    'core/navigation',
    array(
      'name' => 'flat-nav',
      'label' => __( 'Flat Style', 'mixin-styles-gb' ),
    )
  );

  register_block_style(
    'core/navigation',
    array(
      'name' => 'plain',
      'label' => __( 'Plain', 'mixin-styles-gb' ),
    )
  );
}
add_action( 'init', 'mixin_styles_gb_register_block_styles' );
