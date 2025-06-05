const { __ } = wp.i18n;

// Icons for the variations.
// Fluent UI System Icons by Microsoft
// https://iconify.design/
const contentSidebarIcon = wp.element.createElement(
	wp.primitives.SVG,
	{ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	wp.element.createElement(
		wp.primitives.Path,
		{
			d: "M16 21h1.75A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H16zM14.5 3H6.25A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h8.25z",
		}
	)
);

const sidebarContentIcon = wp.element.createElement(
	wp.primitives.SVG,
	{ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	wp.element.createElement(
		wp.primitives.Path,
		{
			d: "M9.5 21h8.25A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H9.5zM8 3H6.25A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21H8z",
		}
	)
);

const columnsIcon = wp.element.createElement(
	wp.primitives.SVG,
	{ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	wp.element.createElement(
		wp.primitives.Path,
		{
			d: "M12.75 21h5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3h-5zm-1.5-18h-5A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h5z",
		}
	)
);

wp.blocks.registerBlockVariation(
	'core/columns',
	{
		name: 'mixin-styles-gb-content-sidebar',
		title: __( 'Content, Sidebar', 'mixin-styles-gb' ),
		description: __( 'This layout is ideal for a content or posts layout, including a right sidebar.', 'mixin-styles-gb' ),
		icon: contentSidebarIcon,
    scope: [ 'block', 'inserter', 'transform' ],
		attributes: {
			className: 'content-sidebar',
			isStackedOnMobile: false,
			style: {
				spacing: {
					blockGap: {
						left: '1.5em'
					}
				}
			}
		},
		innerBlocks: [
			[ 
				'core/column', {
					className: 'content',
					width: '85%' 
				}
			],
			[
				'core/column', {
					className: 'sidebar-outer',
					width: '15%'
				}
			]
		],
		isActive: [ 'className' ]
	}
);

wp.blocks.registerBlockVariation(
	'core/columns',
	{
		name: 'mixin-styles-gb-sidebar-content',
		title: __( 'Sidebar, Content', 'mixin-styles-gb' ),
		description: __( 'This layout is ideal for a content or posts layout, including a left sidebar.', 'mixin-styles-gb' ),
		icon: sidebarContentIcon,
    scope: [ 'block', 'inserter', 'transform' ],
		attributes: {
			className: 'sidebar-content',
			isStackedOnMobile: false,
			style: {
				spacing: {
					blockGap: {
						left: '1.5em'
					}
				}
			}
		},
		innerBlocks: [
			[
				'core/column', {
					className: 'content',
					width: '85%'
				}
			],
			[
				'core/column', {
					className: 'sidebar-outer',
					width: '15%'
				}
			]
		],
		isActive: [ 'className' ]
	}
);

wp.blocks.registerBlockVariation(
	'core/columns',
	{
		name: 'mixin-styles-gb-no-sidebar',
		title: __( 'Content, No Sidebar', 'mixin-styles-gb' ),
		description: __( 'Content or posts layout with no sidebar.', 'mixin-styles-gb' ),
		icon: columnsIcon,
		attributes: {
			className: 'no-sidebar',
			isStackedOnMobile: false,
		},
		innerBlocks: [
			[ 'core/column', { width: '100%' } ]
		],
		isActive: [ 'className' ]
	}
);
