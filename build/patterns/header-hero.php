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
	<!-- wp:group {"className":"mxs-title-panel","layout":{"type":"default"}} -->
	<div class="wp-block-group mxs-title-panel">
		<!-- wp:site-title /-->

		<!-- wp:site-tagline /-->
	</div>
	<!-- /wp:group -->

	<!-- wp:search {"label":"Search","placeholder":"Enter Your Query...","buttonText":"Search","buttonPosition":"no-button","align":"right","className":"is-style-search-header"} /-->

	<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_dots_ovg.png' ) ); ?>","isRepeated":true,"dimRatio":70,"overlayColor":"accent-3","focalPoint":{"x":"0.50","y":0.5},"isDark":false,"className":"is-style-rounded"} -->
	<div class="wp-block-cover is-light is-repeated is-style-rounded">
		<span aria-hidden="true" class="wp-block-cover__background has-accent-3-background-color has-background-dim-70 has-background-dim"></span>
		<div role="img" class="wp-block-cover__image-background is-repeated" style="background-position:50% 50%;background-image:url(<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_dots_ovg.png' ) ); ?>)"></div>
		<div class="wp-block-cover__inner-container">
			<!-- wp:paragraph {"align":"center","placeholder":"Write title…","textColor":"white","fontSize":"large"} -->
			<p class="has-text-align-center has-white-color has-text-color has-large-font-size">See what we have to offer.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:cover -->

	<!-- wp:navigation {"className":"is-style-default","layout":{"type":"flex","orientation":"horizontal","justifyContent":"center"},"fontSize":"normal"} /-->
</div>
<!-- /wp:group -->
