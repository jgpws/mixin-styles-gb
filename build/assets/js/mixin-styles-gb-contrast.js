/******/ (() => { // webpackBootstrap
/*!**************************************************!*\
  !*** ./resources/js/mixin-styles-gb-contrast.js ***!
  \**************************************************/
(function () {
  //console.log("Contrast script is loaded");

  const elements = document.querySelectorAll(".wp-block-group.mxs-card, .mxs-thin-header, .wp-block-navigation:not(.wp-block-navigation__container).is-style-flat-nav");
  elements.forEach(element => {
    const computedBgColor = window.getComputedStyle(element).getPropertyValue("background");

    //console.log(element);
    //console.log(computedBgColor);

    // If `computedBgColor` does not match a digit for an element,
    // return (don't execute the getContrastYIQ function for that element).
    if (!computedBgColor.match(/\d+/g)) {
      return;
    }

    // Convert returned string of computedBgColor to an array
    const rgbStrToArray = computedBgColor.match(/\d+/g).map(Number);
    function getContrastYIQ() {
      const r = rgbStrToArray[0];
      const g = rgbStrToArray[1];
      const b = rgbStrToArray[2];
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      if (yiq >= 128) {
        return "mxs-light-bg";
      } else if (yiq <= 128) {
        element.classList.remove("mxs-light-bg");
        return "mxs-dark-bg";
      } else {
        return;
      }
    }
    element.classList.add(getContrastYIQ());
  });
})();
/******/ })()
;
//# sourceMappingURL=mixin-styles-gb-contrast.js.map