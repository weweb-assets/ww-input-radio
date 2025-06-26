---
name: ww-input-radio
description: A radio input that self-registers with parent radiogroup. Designed to work with ww-radiogroup and ww-label components.
keywords: [radio, form, input, button, selection, choice, option]
---

#### ww-input-radio

***Purpose:***
A radio input component that automatically registers itself with a parent `ww-radiogroup` when present. Designed to be flexible and work both standalone and as part of a radio group, with seamless integration with `ww-label` for enhanced UX.

***Architecture:***
- Self-registers with parent radiogroup if present
- Can be wrapped in ww-label for clickable area
- Maintains its own ID for label association
- Receives state (checked, name, readonly) from parent group

***Recommended Usage:***
Inside a radiogroup with label wrapper:
```
ww-radiogroup
  └── ww-label
       └── ww-input-radio (value="option1")
```

***Properties:***
- value: string/number - ***REQUIRED*** The value this radio represents
- appearance: 'simple'|'custom' - Visual style of the radio button (default: 'simple')
- readonly: boolean - Makes this specific radio readonly (default: false)

***States:***
- checked: Applied when the radio is selected
- readonly: Applied when the radio is readonly

***Behavior:***
- **Inside a radiogroup**: Automatically registers and receives state from the group
- **Standalone**: Functions as an independent radio input
- **Inside a label**: The label becomes clickable to select the radio
- **Click handling**: Wrapper div is clickable for better UX

***Appearance Options:***
- **simple**: Browser default radio button styling
- **custom**: CSS appearance set to 'none' for full customization

***Accessibility:***
- Generates unique IDs for proper label association
- Maintains native HTML radio behavior
- Supports keyboard navigation
- Proper ARIA attributes from parent group

***Integration:***
- **With ww-radiogroup**: Registers its value and receives selection state
- **With ww-label**: Registers to disable label's "for" attribute
- **With forms**: The parent radiogroup handles form integration

***Notes:***
- Must have a unique value within its radio group
- The wrapper div allows clicking anywhere on the component
- Readonly state can come from self or parent group
- ID is auto-generated but can be overridden via attributes