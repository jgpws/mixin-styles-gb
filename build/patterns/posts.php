<?php
/**
 * Title: Posts
 * Slug: mixin-styles-gb/posts
 * Categories: columns, mixin-styles-gb
 * Block Types: core/query
 * Viewport Width: 1366
 */
?>
<!-- wp:query {"queryId":13,"query":{"perPage":5,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"tagName":"main","className":"main is-style-card","layout":{"contentSize":null,"type":"constrained"}} -->
<main class="wp-block-query main is-style-card">
	<!-- wp:query-pagination {"paginationArrow":"chevron","style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"layout":{"type":"flex","justifyContent":"center"}} -->
		<!-- wp:query-pagination-previous /-->

		<!-- wp:query-pagination-next /-->
	<!-- /wp:query-pagination -->

	<!-- wp:post-template {"layout":{"type":"default"}} -->
		<!-- wp:post-title {"isLink":true} /-->

		<!-- wp:group {"className":"entry-meta","layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"top"}} -->
		<div class="wp-block-group entry-meta"><!-- wp:post-author /-->

			<!-- wp:post-date /-->

			<!-- wp:post-terms {"term":"category"} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:post-featured-image {"isLink":true,"align":"left"} /-->

		<!-- wp:post-excerpt {"moreText":"Continue reading..."} /-->
	<!-- /wp:post-template -->

	<!-- wp:query-pagination {"paginationArrow":"chevron","style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"layout":{"type":"flex","justifyContent":"center"}} -->
		<!-- wp:query-pagination-previous /-->

		<!-- wp:query-pagination-next /-->
	<!-- /wp:query-pagination -->
</main>
<!-- /wp:query -->
