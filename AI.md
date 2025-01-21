---
Name: ww-input-radio
Description: A form radio component that allows users to select a single option from multiple choices
Keywords: form, input, radio, choice, selection
---

#### ww-input-radio

A customizable radio button input component that allows users to select a single option from a list of choices. The component supports vertical and horizontal layouts, custom styling, and data binding.

Properties:
- options: {Array} Array of choice objects with label and value properties. Can be bound to dynamic data.
  - Default: [{value: 'first value', label: 'first label'}, {value: 'second value', label: 'second label'}]
  - Bindable: true
  - Multilang: true
- value: {String} Initial selected value
  - Default: ''
  - Bindable: true
- labelField: {String} Field path to use as label when options are bound to complex objects
  - Default: null
- valueField: {String} Field path to use as value when options are bound to complex objects
  - Default: null
- required: {Boolean} Whether the input is required
  - Default: true
  - Bindable: true
- direction: {String} Layout direction of radio buttons
  - Values: 'column' | 'row'
  - Default: 'column'
  - Responsive: true
- rowGap: {Length} Vertical spacing between options
  - Units: px, %, em, rem
  - Responsive: true
- columnGap: {Length} Horizontal spacing between options
  - Units: px, %, em, rem
  - Responsive: true
- justifyContent: {String} Alignment along the main axis
  - Values: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between'
  - Default: 'center'
  - Responsive: true
- alignItems: {String} Alignment along the cross axis
  - Values: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  - Default: 'flex-start'
  - Responsive: true
- flexWrap: {Boolean} Whether options should wrap to new lines (row direction only)
  - Default: true
  - Responsive: true

Children:
- choicesElement: {ww-text} Text element used to display option labels

Events:
- change: Triggered when selection changes
  - Payload: { value: string, domEvent: Event }
- initValueChange: Triggered when initial value changes
  - Payload: { value: string }

Variables:
- value: Current selected value

Example:
```json
{
    "tag": "ww-input-radio",
    "props": {
        "default": {
            "options": [
                {"label": "Option 1", "value": "1"},
                {"label": "Option 2", "value": "2"}
            ],
            "value": "1",
            "required": true,
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "flex-start"
        }
    },
    "children": {
        "choicesElement": {
            "tag": "ww-text",
            "props": {
                "default": {
                    "text": {"en": ""}
                }
            }
        }
    }
}
```