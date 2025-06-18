/* Block styles */

wp.domReady( () => {

	wp.blocks.registerBlockStyle( 'core/cover', [
		{
			name: 'default',
			label: __( 'Default', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'rounded',
			label: __( 'Rounded', 'mixin-styles-gb' ),
		},
		{
			name: 'rounded-full',
			label: __( 'Rounded- Full Height', 'mixin-styles-gb' ),
		}
	] );

	wp.blocks.registerBlockStyle( 'core/group', [
		{
			name: 'default',
			label: __( 'Default', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'card',
			label: __( 'Card Style', 'mixin-styles-gb' ),
		}
	] );

	wp.blocks.registerBlockStyle( 'core/navigation', [
		{
			name: 'default',
			label: __( 'Default', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'tabs',
			label: __( 'Tabs', 'mixin-styles-gb' ),
		},
		{
			name: 'wide-tab',
			label: __( 'Wide Tab', 'mixin-styles-gb' ),
		}
	] );
	
	wp.blocks.registerBlockStyle( 'core/post-featured-image', [
		{
			name: 'default',
			label: __( 'Thumbnail- 300px', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'medium',
			label: __( 'Medium- 600px', 'mixin-styles-gb' )
		},
		{
			name: 'full-width',
			label: __( 'Full- Image Width', 'mixin-styles-gb' )
		}
	] );
	
	wp.blocks.registerBlockStyle( 'core/query', [
		{
			name: 'default',
			label: __( 'Default', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'card',
			label: __( 'Card Style', 'mixin-styles-gb' )
		}
	] );

	wp.blocks.registerBlockStyle( 'core/search', [
		{
			name: 'default',
			label: __( 'Default', 'mixin-styles-gb' ),
			isDefault: true,
		},
		{
			name: 'search-header',
			label: __( 'Search- Header', 'mixin-styles-gb' ),
		}
	] );
	
	wp.blocks.registerBlockStyle( 'core/social-links', [
		{
			name: 'semitransparent-light',
			label: __( 'Semitransparent Light', 'mixin-styles-gb' ),
		},
		{
			name: 'semitransparent-dark',
			label: __( 'Semitransparent Dark', 'mixin-styles-gb' ),
		}
	] );
	
} );
