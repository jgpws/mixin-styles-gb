(function () {
  //console.log("Contrast script is loaded");

  const elements = document.querySelectorAll(".wp-theme-mixin-styles-gb, .mxs-card, .mxs-thin-header, .wp-block-navigation:not(.wp-block-navigation__container).is-style-flat-nav");

  // '.wp-theme-mixin-styles-gb' is the body on the frontend

  const contrastLogic = (elNodelist) => {
    // Convert single element to an array-like structure if needed

    elNodelist.forEach((node) => {
      if (!node) return;

      const computedBgColor = window.getComputedStyle(node).getPropertyValue("background");

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
        if (yiq > 128) {
          if (document.body === node) {
            node.classList.remove("mxs-dark-theme-bg");
            return "mxs-light-theme-bg";
          } else {
            node.classList.remove("mxs-dark-bg");
            return "mxs-light-bg";
          }
        } else if (yiq < 128) {
          if (document.body === node) {
            node.classList.remove("mxs-light-theme-bg");
            return "mxs-dark-theme-bg";
          } else {
            node.classList.remove("mxs-light-bg");
            return "mxs-dark-bg";
          }
        } else {
          return;
        }
      }

      node.classList.add(getContrastYIQ());
    });
  };
  contrastLogic(elements);
})();
