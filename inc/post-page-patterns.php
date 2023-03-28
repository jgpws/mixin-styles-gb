<?php
/* Patterns for posts */

$posts_no_sidebar = '
<!-- wp:columns {"className":"is-style-default no-sidebar"} -->
<div class="wp-block-columns is-style-default no-sidebar"><!-- wp:column {"width":"100%","layout":{"type":"default"}} -->
<div class="wp-block-column" style="flex-basis:100%"><!-- wp:query {"queryId":13,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"tagName":"main","displayLayout":{"type":"list"},"className":"main is-style-card","layout":{"type":"constrained"}} -->
<main class="wp-block-query main is-style-card"><!-- wp:query-pagination {"paginationArrow":"chevron","layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->

<!-- wp:post-template -->
<!-- wp:post-title {"isLink":true} /-->

<!-- wp:group {"className":"is-style-entry-meta"} -->
<div class="wp-block-group is-style-entry-meta"><!-- wp:post-author /-->

<!-- wp:post-date /-->

<!-- wp:post-terms {"term":"category"} /--></div>
<!-- /wp:group -->

<!-- wp:post-featured-image {"isLink":true,"width":"","align":"left"} /-->

<!-- wp:post-excerpt {"moreText":"Continue reading..."} /-->
<!-- /wp:post-template -->

<!-- wp:query-pagination {"paginationArrow":"chevron","layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination --></main>
<!-- /wp:query --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->';

register_block_pattern(
	'mxs-patterns/query-no-sidebar',
	array(
		'title' => esc_html__( 'Posts- No Sidebar', 'mixin-styles-gb' ),
		'content' => trim( $posts_no_sidebar ),
		'categories' => array( 'columns', 'mixin-styles-gb' ),
		'viewportWidth' => 1366,
	)
);
