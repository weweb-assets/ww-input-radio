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

***Examples:***

1. **Simple radio group:**
<elements>
{"uid":"radio-group-1","tag":"ww-radiogroup","name":"Size Selection","props":{"default":{"name":"size","value":"medium","fieldName":"size"}},"styles":{"default":{"display":"flex","gap":"16px"}},"slots":{"children":[{"uid":"radio-small"},{"uid":"radio-medium"},{"uid":"radio-large"}]}}
{"uid":"radio-small","tag":"ww-input-radio","props":{"default":{"value":"small"}}}
{"uid":"radio-medium","tag":"ww-input-radio","props":{"default":{"value":"medium"}}}
{"uid":"radio-large","tag":"ww-input-radio","props":{"default":{"value":"large"}}}
</elements>

2. **Radio with label (recommended pattern):**
<elements>
{"uid":"radio-group-2","tag":"ww-radiogroup","name":"Plan Selection","props":{"default":{"name":"plan","fieldName":"plan"}},"styles":{"default":{"display":"flex","flexDirection":"column","gap":"12px"}},"slots":{"children":[{"uid":"basic-option"},{"uid":"pro-option"}]}}
{"uid":"basic-option","tag":"ww-label","styles":{"default":{"display":"flex","alignItems":"center","gap":"8px","cursor":"pointer"}},"slots":{"children":[{"uid":"basic-radio"},{"uid":"basic-text"}]}}
{"uid":"basic-radio","tag":"ww-input-radio","props":{"default":{"value":"basic"}}}
{"uid":"basic-text","tag":"ww-text","props":{"default":{"text":{"en":"Basic Plan - $10/month"}}}}
{"uid":"pro-option","tag":"ww-label","styles":{"default":{"display":"flex","alignItems":"center","gap":"8px","cursor":"pointer"}},"slots":{"children":[{"uid":"pro-radio"},{"uid":"pro-text"}]}}
{"uid":"pro-radio","tag":"ww-input-radio","props":{"default":{"value":"pro"}}}
{"uid":"pro-text","tag":"ww-text","props":{"default":{"text":{"en":"Pro Plan - $25/month"}}}}
</elements>

3. **Custom styled radio (hidden with label card):**
<elements>
{"uid":"radio-group-3","tag":"ww-radiogroup","name":"Theme Selection","props":{"default":{"name":"theme","value":"light"}},"styles":{"default":{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"16px"}},"slots":{"children":[{"uid":"light-card"},{"uid":"dark-card"}]}}
{"uid":"light-card","tag":"ww-label","styles":{"default":{"display":"flex","flexDirection":"column","alignItems":"center","padding":"24px","border":"2px solid #e5e7eb","borderRadius":"12px","cursor":"pointer","transition":"all 0.2s"},"_wwHover_default":{"borderColor":"#3b82f6"}},"slots":{"children":[{"uid":"light-icon"},{"uid":"light-title"},{"uid":"light-radio"}]}}
{"uid":"light-icon","tag":"ww-icon","props":{"default":{"icon":"sun"}},"styles":{"default":{"fontSize":"32px","marginBottom":"8px","color":"#f59e0b"}}}
{"uid":"light-title","tag":"ww-text","props":{"default":{"text":{"en":"Light Mode"}}},"styles":{"default":{"fontSize":"16px","fontWeight":"600","marginBottom":"8px"}}}
{"uid":"light-radio","tag":"ww-input-radio","props":{"default":{"value":"light","appearance":"hidden"}}}
{"uid":"dark-card","tag":"ww-label","styles":{"default":{"display":"flex","flexDirection":"column","alignItems":"center","padding":"24px","border":"2px solid #e5e7eb","borderRadius":"12px","cursor":"pointer","transition":"all 0.2s"},"_wwHover_default":{"borderColor":"#3b82f6"}},"slots":{"children":[{"uid":"dark-icon"},{"uid":"dark-title"},{"uid":"dark-radio"}]}}
{"uid":"dark-icon","tag":"ww-icon","props":{"default":{"icon":"moon"}},"styles":{"default":{"fontSize":"32px","marginBottom":"8px","color":"#6366f1"}}}
{"uid":"dark-title","tag":"ww-text","props":{"default":{"text":{"en":"Dark Mode"}}},"styles":{"default":{"fontSize":"16px","fontWeight":"600","marginBottom":"8px"}}}
{"uid":"dark-radio","tag":"ww-input-radio","props":{"default":{"value":"dark","appearance":"hidden"}}}
</elements>