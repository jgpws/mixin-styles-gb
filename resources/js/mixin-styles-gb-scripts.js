/**
 * File mixin-style-gb-scripts.js.
 *
 * Licenses for the scripts are GPLv2 or compatible
 */

(function () {
  function slideDownHeader() {
    /** Intersection Observer based slide-down effect
     * for sticky header element.
     */

    const stickyHeader = document.querySelector(".mxs-slide-down-header");
    const mainContent = document.querySelectorAll(
      ".mxs-slide-down-header + .content-sidebar .main, .mxs-slide-down-header + .sidebar-content .main, .mxs-slide-down-header + .no-sidebar .main"
    );

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        //console.log(entry);
        stickyHeader.classList.add("scale-up", "no-transition");
        if (entry.isIntersecting) {
          setTimeout(() => {
            stickyHeader.classList.replace("scale-up", "scale-down");
            stickyHeader.classList.remove("no-transition");
          }, 200);
        } else {
          stickyHeader.classList.replace("scale-down", "scale-up");
          stickyHeader.classList.remove("no-transition");
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect);

    mainContent.forEach((content) => observer.observe(content));
  }

  function removeBordersFromNavWithButtonOnly() {
    /**
     * Temporary fix until CSS :has has wide browser support.
     * Removes the borders from .wp-block-navigation
     * when the child button has class .always-shown.
     */

    // Check for the width of the screen
    var screenWidth = window.matchMedia("(min-width: 600px)");
    let el = document.querySelector(
        ".wp-block-navigation__responsive-container-open.always-shown"
      ),
      elParent = null;

    if (screenWidth.matches) {
      //console.log('Screen width is greater than 600px');

      if (el) {
        elParent = el.parentNode;
        elParent.style.borderTop = "0px solid transparent";
        elParent.style.borderBottom = "0px solid transparent";
      }
    }
  }

  window.addEventListener("load", () => {
    slideDownHeader();
    removeBordersFromNavWithButtonOnly();
  });

  window.addEventListener("resize", () => {
    removeBordersFromNavWithButtonOnly();
  });
})();
