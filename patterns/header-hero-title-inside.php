<?php
/**
 * Title: Header- Hero (Title Inside)
 * Slug: mixin-styles-gb/header-hero-title-inside
 * Categories: header, mixin-styles-gb
 * Block Types: core/template-part/header
 * Viewport Width: 1366
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}}},"className":"is-style-default header-hero-title-inside","layout":{"inherit":true}} -->
<div class="wp-block-group is-style-default header-hero-title-inside">
	<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_concircles_rby.png' ) ); ?>","id":11904,"isRepeated":true,"dimRatio":50,"overlayColor":"accent-3","contentPosition":"top center","isDark":false,"align":"full","className":"is-style-rounded-full"} -->
	<div class="wp-block-cover alignfull is-light is-repeated has-custom-content-position is-position-top-center is-style-rounded-full" style="background-image:url(<?php echo esc_url( get_theme_file_uri( 'assets/images/bg_concircles_rby.png' ) ); ?>)">
		<span aria-hidden="true" class="has-accent-3-background-color wp-block-cover__gradient-background has-background-dim"></span>
		<div class="wp-block-cover__inner-container">
			<!-- wp:columns -->
			<div class="wp-block-columns">
				<!-- wp:column {"width":"66.66%"} -->
				<div class="wp-block-column" style="flex-basis:66.66%">
					<!-- wp:site-title /-->

					<!-- wp:site-tagline {"textColor":"white"} /-->
				</div>
				<!-- /wp:column -->

				<!-- wp:column {"width":"33.33%"} -->
				<div class="wp-block-column" style="flex-basis:33.33%">
					<!-- wp:social-links {"align":"center","className":"is-style-semitransparent-dark","layout":{"type":"flex","justifyContent":"center"}} -->
					<ul class="wp-block-social-links aligncenter is-style-semitransparent-dark">
						<!-- wp:social-link {"url":"#","service":"instagram"} /-->

						<!-- wp:social-link {"url":"#","service":"tiktok"} /-->

						<!-- wp:social-link {"url":"#","service":"facebook"} /-->

						<!-- wp:social-link {"url":"#","service":"twitter"} /-->

						<!-- wp:social-link {"url":"#","service":"youtube"} /--></ul>
					<!-- /wp:social-links -->
				</div>
				<!-- /wp:column -->
			</div>
			<!-- /wp:columns -->
		</div>
	</div>
	<!-- /wp:cover -->

	<!-- wp:navigation {"className":"is-style-default","layout":{"type":"flex","orientation":"horizontal","justifyContent":"center"},"fontSize":"normal"} /-->
</div>
<!-- /wp:group -->