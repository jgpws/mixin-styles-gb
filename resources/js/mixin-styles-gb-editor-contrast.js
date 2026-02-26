const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const { useEffect, useState } = wp.element;
const { subscribe } = wp.data;

(function () {
  /* Contrast processing function */

  // Process contrasting colors
  function editorContrastLogic(element, options = { target: "both" }) {
    const computedBgColor = element.ownerDocument.defaultView.getComputedStyle(element).backgroundColor;

    if (element.classList.contains("main")) {
      console.log("Main background color:", computedBgColor);
    }

    if (element.classList.contains("mxs-thin-header")) {
      console.log("Thin header background color:", computedBgColor);
    }

    if (element.classList.contains("sidebar")) {
      console.log("Sidebar background color:", computedBgColor);
    }

    // If `computedBgColor` does not match a digit for an element,
    // return (don't execute the getContrastYIQ function for that element).
    if (!computedBgColor.match(/\d+/g)) {
      return;
    }

    // Convert returned string of computedBgColor to an array
    const rgbStrToArray = computedBgColor.match(/\d+/g).map(Number);
    const r = rgbStrToArray[0];
    const g = rgbStrToArray[1];
    const b = rgbStrToArray[2];
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    const isLight = yiq > 128;
    const isDark = yiq < 128;

    const blockClass = isLight ? "mxs-light-bg" : "mxs-dark-bg";
    const bodyClass = isDark ? "mxs-dark-theme-bg" : "mxs-light-theme-bg";

    if (options.target === "block" || options.target === "both") {
      // If color is returned as transparent, set default to 'mxs-light-bg'.
      //console.log(computedBgColor === "rgba(0, 0, 0, 0)");
      if (computedBgColor === "rgba(0, 0, 0, 0)" || computedBgColor === "transparent") {
        element.classList.remove("mxs-light-bg", "mxs-dark-bg");
        element.classList.add("mxs-light-bg");
        return "mxs-light-bg";
      }

      // Check for transparent backround and remove both classes.
      element.classList.remove("mxs-light-bg", "mxs-dark-bg");
      element.classList.add(blockClass);

      return blockClass;
    }

    if (options.target === "body" || options.target === "both") {
      //console.log("Background detected:", computedBgColor);
      const bodyEl = element.ownerDocument.body;

      bodyEl.classList.remove("mxs-light-theme-bg", "mxs-dark-theme-bg");
      bodyEl.classList.add(bodyClass);

      return bodyClass;
    }

    //console.log(element);
  } // ends editorContrastLogic

  /* Body class plugin */
  const GlobalStyleContrastSync = () => {
    useEffect(() => {
      let lastColor = "";

      const updateBodyContrast = () => {
        // Get the current Global Styles background color
        // This works when clicking palettes in "Browse Styles"

        // Find the iframe body
        const topDoc = window.document;
        const iframe = topDoc.querySelector('iframe[name="editor-canvas"]');

        const iframeDoc = iframe ? iframe.contentDocument || iframe.contentWindow.document : null;

        if (!iframeDoc || typeof iframeDoc.querySelector !== "function") {
          return;
        }

        const iframeBody = iframeDoc ? iframeDoc.body : document.querySelector(".editor-styles-wrapper");

        if (iframeBody && editorContrastLogic) {
          // Pass a flag to tell logic to ONLY update the body class
          const currentColor = window.getComputedStyle(iframeBody).backgroundColor;

          if (currentColor !== lastColor) {
            lastColor = currentColor;

            // Trigger your logic with the 'body' target flag
            editorContrastLogic(iframeBody, { target: "body" });
          }
        }
      };
      updateBodyContrast();

      const unsubscribe = subscribe(() => {
        // Use requestAnimationFrame to wait for the CSS variable to "paint"
        requestAnimationFrame(updateBodyContrast);
      });

      return () => unsubscribe();
    }, []);

    return null;
  };

  wp.plugins.registerPlugin("mixin-styles-gb-body-sync", {
    render: GlobalStyleContrastSync,
  });

  /* Style Book contrast function */
  // This handles the specific iframe once found
  const updateStyleBookContrast = (iframe) => {
    const injectWithRetry = (attempts = 0) => {
      const styleBookDoc = iframe.contentDocument || iframe.contentWindow.document;

      if (!styleBookDoc || !styleBookDoc.body) return;

      if (styleBookDoc && styleBookDoc.body && styleBookDoc.body.innerHTML.trim() !== "" && editorContrastLogic) {
        console.log("Style Book document ready!");

        //styleBookDoc.body.classList.add("mxs-dark-theme-bg"); // Mark as handled
        editorContrastLogic(styleBookDoc.body, { target: "body" });
      } else if (attempts < 20) {
        // If it's empty, wait 100ms and try again (up to 2 seconds total)
        setTimeout(() => injectWithRetry(attempts + 1), 100);
      }
    };

    // Listen for the load event, but also start the retry immediately
    // in case it's already "loaded" as a blank page.
    iframe.addEventListener("load", () => injectWithRetry(0));
    injectWithRetry(0);
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Check newly added nodes for the specific iframe
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Ensure it's an element
          const styleBookIframe = node.matches('iframe[name="style-book-canvas"]') ? node : node.querySelector('iframe[name="style-book-canvas"]');

          if (styleBookIframe) {
            updateStyleBookContrast(styleBookIframe);
          }
        }
      });
    }
  });

  // Start observing the main editor container (or document.body for safety)
  // WordPress editor containers vary, so document.body is the most reliable target.
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Optional: Check if it's already in the DOM (in case the script runs late)
  const existingIframe = document.querySelector('iframe[name="style-book-canvas"]');
  if (existingIframe) updateStyleBookContrast(existingIframe);

  /* Block contrast class filter */
  const withBlockContrast = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
      const { attributes, clientId } = props;
      const [dynamicClass, setDynamicClass] = useState("");

      // Extract classes and block style
      const customClassName = attributes.className || "";
      const blockStyle = attributes.className || ""; // Block styles (like .is-style-flat-nav) are stored here

      // Check if this block matches your targets
      const isTarget = customClassName.includes("mxs-card") || customClassName.includes("mxs-thin-header") || blockStyle.includes("is-style-flat-nav");

      useEffect(() => {
        if (!isTarget) return;

        // Find the element inside the Editor iframe (if present) or main document
        const editorCanvas = window.document.querySelector('iframe[name="editor-canvas"]');
        const doc = editorCanvas ? editorCanvas.contentDocument : document;
        const blockElement = doc.getElementById(`block-${clientId}`);

        if (blockElement) {
          // Wait for the next animation frame
          requestAnimationFrame(() => {
            // Wait for a SECOND frame to ensure the
            // Theme Preset CSS variables have fully resolved in the DOM.
            requestAnimationFrame(() => {
              const appliedToBlocks = editorContrastLogic(blockElement, { target: "block" });

              if (appliedToBlocks !== dynamicClass) {
                setDynamicClass(appliedToBlocks);
              }
            });
          });
        }
      }, [attributes.style, attributes.backgroundColor, clientId, isTarget]);

      // We pass the dynamicClass into the existing BlockListBlock props.
      // WordPress will merge this with existing classes
      return <BlockListBlock {...props} className={dynamicClass} />;
    };
  }, "withBlockContrast");

  addFilter("editor.BlockListBlock", "mixin-styles-gb/targeted-contrast", withBlockContrast);
})();
