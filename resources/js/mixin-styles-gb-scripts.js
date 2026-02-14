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
    const mainContent = document.querySelectorAll(".mxs-slide-down-header + .content-sidebar .main, .mxs-slide-down-header + .sidebar-content .main, .mxs-slide-down-header + .no-sidebar .main");

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

  window.addEventListener("load", () => {
    slideDownHeader();
  });
})();
