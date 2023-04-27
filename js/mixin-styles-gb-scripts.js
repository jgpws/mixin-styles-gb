/**
 * File mixin-style-gb-scripts.js.
 *
 * Licenses for the scripts are GPLv2 or compatible
 */
 
(function() {

  function removeBordersFromNavWithButtonOnly() {
    /**
     * Temporary fix until CSS :has has wide browser support.
     * Removes the borders from .wp-block-navigation
     * when the child button has class .always-shown.
     */
    
    // Check for the width of the screen
    var screenWidth = window.matchMedia("(min-width: 600px)");
    let el = document.querySelector(".wp-block-navigation__responsive-container-open.always-shown"), elParent = null;
    
    if (screenWidth.matches) {
      //console.log('Screen width is greater than 600px');
      
      if(el) {
        elParent = el.parentNode;
        elParent.style.borderTop = "0px solid transparent";
        elParent.style.borderBottom = "0px solid transparent";
      }
    }
  }
  //window.onload = removeBordersFromNavWithButtonOnly();
  
  window.addEventListener('load', () => {
    removeBordersFromNavWithButtonOnly();
  });
  
  window.addEventListener('resize', () => {
    removeBordersFromNavWithButtonOnly();
  });
})();