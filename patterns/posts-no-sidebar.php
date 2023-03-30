<?php
/**
 * Title: Posts- No Sidebar
 * Slug: mixin-styles-gb/posts-no-sidebar
 * Categories: columns, mixin-styles-gb
 * Block Types: core/columns, core/query
 * Viewport Width: 1366
 */
?>
<!-- wp:columns {"className":"is-style-default no-sidebar"} -->
<div class="wp-block-columns is-style-default no-sidebar">
	<!-- wp:column {"width":"100%","layout":{"type":"default"}} -->
	<div class="wp-block-column" style="flex-basis:100%">
		<!-- wp:query {"query":{"perPage":5,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"tagName":"main","displayLayout":{"type":"list"},"className":"main is-style-card","layout":{"type":"constrained"}} -->
		<main class="wp-block-query main is-style-card">
			<!-- wp:query-pagination {"paginationArrow":"chevron","layout":{"type":"flex","justifyContent":"center"}} -->
				<!-- wp:query-pagination-previous /-->

				<!-- wp:query-pagination-next /-->
			<!-- /wp:query-pagination -->

			<!-- wp:post-template -->
				<!-- wp:post-title {"isLink":true} /-->

				<!-- wp:group {"className":"entry-meta","layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"top"}} -->
				<div class="wp-block-group entry-meta"><!-- wp:post-author /-->

					<!-- wp:post-date /-->

					<!-- wp:post-terms {"term":"category"} /-->
				</div>
				<!-- /wp:group -->

				<!-- wp:post-featured-image {"isLink":true,"width":"","align":"left"} /-->

				<!-- wp:post-excerpt {"moreText":"Continue reading..."} /-->
			<!-- /wp:post-template -->

			<!-- wp:query-pagination {"paginationArrow":"chevron","layout":{"type":"flex","justifyContent":"center"}} -->
				<!-- wp:query-pagination-previous /-->

				<!-- wp:query-pagination-next /-->
			<!-- /wp:query-pagination -->
		</main>
		<!-- /wp:query -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->