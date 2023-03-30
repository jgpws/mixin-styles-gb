<?php
/**
 * Title: Header- Hero
 * Slug: mixin-styles-gb/header-hero
 * Categories: header, mixin-styles-gb
 * Block Types: core/template-part/header
 * Viewport Width: 1366
 */
?>
<!-- wp:group {"className":"mxs-header header-hero","layout":{"inherit":false}} -->
<div class="wp-block-group mxs-header header-hero">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"85%"} -->
		<div class="wp-block-column" style="flex-basis:85%">
			<!-- wp:site-title /-->
			<!-- wp:site-tagline {"textColor":"white"} /-->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"15%"} -->
		<div class="wp-block-column" style="flex-basis:15%">
			<!-- wp:search {"label":"Search","placeholder":"Enter Your Query...","buttonText":"Search","buttonPosition":"no-button","align":"right","className":"is-style-search-header"} /-->
		</div>
	<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_dots_ovg.png' ) ); ?>","id":11892,"isRepeated":true,"dimRatio":50,"overlayColor":"accent-3","focalPoint":{"x":"0.50","y":0.5},"isDark":false,"className":"is-style-rounded"} -->
	<div class="wp-block-cover is-light is-repeated is-style-rounded" style="background-image:url(<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_dots_ovg.png' ) ) ?>)">
		<span aria-hidden="true" class="has-accent-3-background-color wp-block-cover__gradient-background has-background-dim"></span>
		<div class="wp-block-cover__inner-container">
			<!-- wp:paragraph {"align":"center","placeholder":"Write title…","textColor":"white","fontSize":"large"} -->
			<p class="has-text-align-center has-white-color has-text-color has-large-font-size"><?php echo __( 'See what we have to offer.', 'mixin-styles-gb' ); ?> </p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:cover -->

	<!-- wp:navigation {"className":"is-style-default","layout":{"type":"flex","orientation":"horizontal","justifyContent":"center"},"fontSize":"normal"} /-->
</div>
<!-- /wp:group -->