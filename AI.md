---
name: ww-input-radio
description: Multi-option radio group component. Works with ww-radiogroup and ww-radiogroup-item.
keywords: [radio, form, input, selection, choice, option, group]
---

#### ww-input-radio

***Purpose:***
A complete radio group component that renders multiple radio button options. Manages selection state internally and provides customizable choice display through child elements.

***Features:***
- Built-in multi-option support with label/value pairs
- Customizable choice rendering through child elements
- Form integration with validation
- Responsive layout options
- Automatic unique ID generation for proper radio grouping

***Properties:***
- options: Array<{label: string, value: string}> - Array of radio choices (default: 2 sample options)
- value: string - Currently selected value
- name: string - HTML name attribute for form submission
- required: boolean - Whether a selection is required (default: false)
- readonly: boolean - Whether the radio group is read-only (default: false)
- choicesElement: Object - Element configuration for rendering each choice label

***Slots:***
- choicesElement: (element) ww-text - Template for rendering choice labels

***Context data (only accessible to this element and its children):***
- context.item - Current option object in the loop
- context.index - Current option index in the loop

***Exposed Variables:***
- value: Currently selected value (path: variables['current_element_uid-value'])

***Events:***
- change: Triggered when selection changes. Payload: { value: string, domEvent: Event }
- initValueChange: Triggered when initial value changes. Payload: { value: string }

***Notes:***
- Each radio group generates a unique ID to prevent conflicts
- In editor mode, radio buttons are readonly to prevent accidental changes
- Supports multilingual option labels
- Uses wwLayoutItemContext for proper data binding in repeated elements

***Example:***
Basic usage with custom styled options:
<elements>
{"uid":0,"tag":"ww-input-radio","props":{"default":{"options":[{"value":"basic","label":"Basic Plan"},{"value":"pro","label":"Professional"},{"value":"enterprise","label":"Enterprise"}],"value":"basic","required":true,"name":"subscription"}},"styles":{"default":{"display":"flex","flexDirection":"column","rowGap":"12px"}},"children":{"choicesElement":{"uid":1}}}
{"uid":1,"tag":"ww-text","props":{"default":{"text":{"en":"{{label}}"}}},"styles":{"default":{"fontSize":"16px","fontWeight":"500"}}}
</elements>