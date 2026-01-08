import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, RadioControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

addFilter(
  "blocks.registerBlockType",
  "mixin-styles-gb/add-light-dark-bg-class",
  (settings, name) => {
    if (
      name !== "core/group" ||
      name !== "core/columns" ||
      name !== "core/navigation"
    ) {
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
  },
);

function Edit(props) {
  const { attributes, setAttributes } = props;

  const setIsLightBgDefault = (newValue) => {
    // Get the current classes
    const currentClass = attributes.className
      ? attributes.className.split(" ")
      : [];

    // Remove any previous theme-related classes
    // This ensures classes like `mxs-light-bg` or `mxs-dark-bg` don't stack
    const filteredClasses = currentClass.filter(
      (cls) => cls !== "mxs-light-bg" && cls !== "mxs-dark-bg",
    );

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
              { label: __("Light", "mixin-styles-gb"), value: "light" },
              { label: __("Dark", "mixin-styles-gb"), value: "dark" },
            ]}
            onChange={setIsLightBgDefault}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  );
}

// Add a filter for BlockEdit to render only our
addFilter(
  "editor.BlockEdit",
  "mixin-styles-gb/add-light-dark-bg-class",
  createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      const { name, attributes } = props;
      const hasMxsContrastClass = attributes.className
        ?.split(" ")
        .includes("mxs-contrasting-color");
      const hasFlatNavClass = attributes.className
        ?.split(" ")
        .includes("is-style-flat-nav");

      if (
        (name === "core/group" && hasMxsContrastClass) ||
        (name === "core/columns" && hasMxsContrastClass) ||
        (name === "core/navigation" && hasFlatNavClass)
      ) {
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
      const hasMxsContrastClass = attributes.className
        ?.split(" ")
        .includes("mxs-contrasting-color");
      const hasFlatNavClass = attributes.className === "is-style-flat-nav";

      if (
        (name === "core/group" && hasMxsContrastClass) ||
        (name === "core/columns" && hasMxsContrastClass) ||
        (name === "core/navigation" && hasFlatNavClass)
      ) {
        return <BlockListBlock {...props} className={props.className} />;
      } else {
        return <BlockListBlock {...props} />;
      }
    };
  }),
);
