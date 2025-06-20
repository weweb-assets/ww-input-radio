---
name: ww-input-radio
description: A customizable radio button input component for single option selection. Requires the ww-radiogroup component to be integrated.
keywords: [radio, form, input, button, selection, choice]
---

#### ww-input-radio

***Purpose:***
A native HTML radio input component that allows users to select a single option from a set of choices. Supports both browser default styling and custom appearances, with various states and accessibility features.

***Features:***
- Native HTML radio button implementation
- Support for simple and custom appearances
- Full accessibility support
- Integration with parent ww-radiogroup component

***Properties:***
- appearance: 'simple'|'custom' - Controls visual style of the radio button (default: 'simple')
- readonly: boolean - Prevents user interaction when true (default: false)

***Exposed Variables:***
- isChecked: Current checked state of the radio button (path: variables['current_element_uid-isChecked'])
- isReadonly: Current readonly state (path: variables['current_element_uid-isReadonly'])
- isRequired: Whether the radio input is required (path: variables['current_element_uid-isRequired'])
- isDisabled: Whether the radio input is disabled (path: variables['current_element_uid-isDisabled'])
- name: Name attribute for the radio input (path: variables['current_element_uid-name'])
- value: Current value of the radio input (path: variables['current_element_uid-value'])

***Notes:***
- The 'custom' appearance sets CSS appearance to 'none' for full customization
- Integrates seamlessly with ww-radiogroup through Vue's provide/inject pattern
- Maintains native HTML radio behavior for accessibility

***Example:***
<elements>
{"uid":"input_radio","tag":"ww-input-radio","props":{"default":{"readonly":false,"appearance":"simple"}},"styles":{"default":{"margin":"5px 5px","display":true,"outline":"none"}}}
</elements>
