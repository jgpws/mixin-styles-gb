import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { registerPlugin } from "@wordpress/plugins";
import { useEffect, useState } from "@wordpress/element";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/editor";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, RadioControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import domReady from "@wordpress/dom-ready";
import { document } from "postcss";

domReady(() => {
  addFilter("blocks.registerBlockType", "mixin-styles-gb/add-light-dark-bg-class", (settings, name) => {
    if (name !== "core/group" || name !== "core/columns" || name !== "core/navigation") {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        isLightBgDefault: {
          type: "string",
          default: "light",
        },
      },
    };
  });

  function Edit(props) {
    const { attributes, setAttributes } = props;

    const setIsLightBgDefault = (newValue) => {
      // Get the current classes
      const currentClass = attributes.className ? attributes.className.split(" ") : [];

      // Remove any previous theme-related classes
      // This ensures classes like `mxs-light-bg` or `mxs-dark-bg` don't stack
      const filteredClasses = currentClass.filter((cls) => cls !== "mxs-light-bg" && cls !== "mxs-dark-bg");

      // Add the new theme class based on the radio selection
      const contrastClass = newValue === "light" ? "mxs-light-bg" : "mxs-dark-bg";
      filteredClasses.push(contrastClass);

      setAttributes({
        isLightBgDefault: newValue,
        className: filteredClasses.join(" ").trim(),
      });
    };

    return (
      <InspectorControls group="styles">
        <PanelBody title={__("Block Contrasting Color", "mixin-styles-gb")}>
          <PanelRow>
            <RadioControl
              label="Block Background"
              selected={props.attributes.isLightBgDefault}
              options={[
                {
                  label: __("Light", "mixin-styles-gb"),
                  value: "light",
                },
                {
                  label: __("Dark", "mixin-styles-gb"),
                  value: "dark",
                },
              ]}
              onChange={setIsLightBgDefault}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
    );
  }

  // Add a filter for BlockEdit to render only our Inspector Controls
  addFilter(
    "editor.BlockEdit",
    "mixin-styles-gb/add-light-dark-bg-class",
    createHigherOrderComponent((BlockEdit) => {
      return (props) => {
        const { name, attributes } = props;
        const hasMxsContrastClass = attributes.className?.split(" ").includes("mxs-contrasting-color");
        const hasFlatNavClass = attributes.className?.split(" ").includes("is-style-flat-nav");

        if ((name === "core/group" && hasMxsContrastClass) || (name === "core/columns" && hasMxsContrastClass) || (name === "core/navigation" && hasFlatNavClass)) {
          return (
            <>
              <Edit {...props} />
              <BlockEdit {...props} />
            </>
          );
        } else {
          return <BlockEdit {...props} />;
        }
      };
    }),
  );

  addFilter(
    "editor.BlockListBlock",
    "mixin-styles-gb/add-light-dark-bg-class",
    createHigherOrderComponent((BlockListBlock) => {
      return (props) => {
        const { name, attributes } = props;
        const hasMxsContrastClass = attributes.className?.split(" ").includes("mxs-contrasting-color");
        const hasFlatNavClass = attributes.className === "is-style-flat-nav";

        if ((name === "core/group" && hasMxsContrastClass) || (name === "core/columns" && hasMxsContrastClass) || (name === "core/navigation" && hasFlatNavClass)) {
          return <BlockListBlock {...props} className={props.className} />;
        } else {
          return <BlockListBlock {...props} />;
        }
      };
    }),
  );

  const ThemeContrastSwitcher = ({ value: externalValue }) => {
    // 1. Fallback State: Prevents "onChange is not a function" error
    const [internalValue, setInternalValue] = useState("dark");

    // Determine which value and function to use (priority to external props)
    const value = externalValue || internalValue;
    const handleChange = (newValue) => {
      setInternalValue(newValue);
    };

    useEffect(() => {
      if (typeof window === "undefined" || !window.document) return;

      const updateFrames = () => {
        const frames = [
          { name: "editor-canvas", injectFiles: false },
          { name: "style-book-canvas", injectFiles: true },
        ];

        frames.forEach(({ name, injectFiles }) => {
          const iframe = window.document.querySelector(`iframe[name="${name}"]`);
          if (!iframe || !iframe.contentDocument) return;

          const iframeDoc = iframe.contentDocument;
          const wrapper = iframeDoc.querySelector(".editor-styles-wrapper") || iframeDoc.body;

          // A. Add Body Classes
          wrapper.classList.remove("mxs-dark-theme-bg", "mxs-light-theme-bg");
          wrapper.classList.add(`mxs-${value}-theme-bg`);

          // B. Inject CSS Files for Style Book only
          if (injectFiles) {
            let link = iframeDoc.getElementById(`mxs-theme-files-${name}`);
            if (!link) {
              const styleBookFile = value === "dark" ? "/build/assets/css/style-book-dark.css" : "/build/assets/css/style-book-light.css";

              link = iframeDoc.createElement("link");
              link.id = `mxs-theme-files-${name}`;
              link.rel = "stylesheet";
              link.href = themePath + styleBookFile;
              iframeDoc.head.appendChild(link);
            }
          }
        });
      };

      // Run immediately and observe for late-loading iframes
      updateFrames();
      const observer = new MutationObserver(updateFrames);
      observer.observe(window.document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }, [value]);

    return (
      <>
        <PluginSidebarMoreMenuItem target="theme-switcher-sidebar">{__("Dark/Light Theme Colors", "mixin-styles-gb")}</PluginSidebarMoreMenuItem>
        <PluginSidebar title={__("Switch Dark/Light Theme Colors", "mixin-styles-gb")} name="theme-switcher-sidebar">
          <PanelBody>
            <RadioControl
              label={__("Theme Background", "mixin-styles-gb")}
              selected={value}
              options={[
                { label: __("Dark", "mixin-styles-gb"), value: "dark" },
                { label: __("Light", "mixin-styles-gb"), value: "light" },
              ]}
              onChange={handleChange}
            />
          </PanelBody>
        </PluginSidebar>
      </>
    );
  };

  registerPlugin("theme-contrast-switcher", { render: ThemeContrastSwitcher });
});
