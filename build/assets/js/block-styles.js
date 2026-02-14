/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./resources/js/block-styles.js ***!
  \**************************************/
/* Block styles */

wp.domReady(() => {
  // For Internationalization.
  const {
    __
  } = wp.i18n;
  const outlineBlocks = ["core/post-template", "core/pullquote"];
  const outlineStyles = [{
    name: "element-outline",
    label: __("Outline", "mixin-styles-gb")
  }, {
    name: "element-shadow-soft",
    label: __("Soft Drop Shadow", "mixin-styles-gb")
  }, {
    name: "element-shadow",
    label: __("Drop Shadow", "mixin-styles-gb")
  }, {
    name: "element-shadow-backlight",
    label: __("Backlight", "mixin-styles-gb")
  }];
  outlineBlocks.forEach(blockName => {
    outlineStyles.forEach(style => {
      wp.blocks.registerBlockStyle(blockName, style);
    });
  });
  wp.blocks.registerBlockStyle("core/button", [{
    name: "flat",
    label: __("Flat Style", "mixin-styles-gb")
  }, {
    name: "disappearing",
    label: __("Disappearing", "mixin-styles-gb")
  }]);
  wp.blocks.registerBlockStyle("core/cover", [{
    name: "default",
    label: __("Default", "mixin-styles-gb"),
    isDefault: true
  }, {
    name: "rounded",
    label: __("Rounded", "mixin-styles-gb")
  }, {
    name: "rounded-full",
    label: __("Rounded- Full Height", "mixin-styles-gb")
  }]);
  wp.blocks.registerBlockStyle("core/group", [{
    name: "no-decorations",
    label: __("No Decorations", "mixin-styles-gb")
  }, {
    name: "no-decorations-arrow-markers",
    label: __("No Decorations (With Arrow Markers)", "mixin-styles-gb")
  }]);
  wp.blocks.registerBlockStyle("core/navigation", [{
    name: "default",
    label: __("Default", "mixin-styles-gb"),
    isDefault: true
  }, {
    name: "tabs",
    label: __("Tabs", "mixin-styles-gb")
  }, {
    name: "wide-tab",
    label: __("Wide Tab", "mixin-styles-gb")
  }, {
    name: "flat-nav",
    label: __("Flat Style", "mixin-styles-gb")
  }, {
    name: "plain",
    label: __("Plain")
  }]);
  wp.blocks.registerBlockStyle("core/post-featured-image", [{
    name: "default",
    label: __("Thumbnail- 300px", "mixin-styles-gb"),
    isDefault: true
  }, {
    name: "medium",
    label: __("Medium- 600px", "mixin-styles-gb")
  }, {
    name: "full-width",
    label: __("Full- Image Width", "mixin-styles-gb")
  }]);
  wp.blocks.registerBlockStyle("core/search", [{
    name: "default",
    label: __("Default", "mixin-styles-gb"),
    isDefault: true
  }, {
    name: "search-header",
    label: __("Search- Header", "mixin-styles-gb")
  }, {
    name: "search-header-dark-bg",
    label: __("Search- Header (dark background)", "mixin-styles-gb")
  }]);
  wp.blocks.registerBlockStyle("core/social-links", [{
    name: "semitransparent-light",
    label: __("Semitransparent Light", "mixin-styles-gb")
  }, {
    name: "semitransparent-dark",
    label: __("Semitransparent Dark", "mixin-styles-gb")
  }]);
});
/******/ })()
;
//# sourceMappingURL=block-styles.js.map