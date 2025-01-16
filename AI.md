---
name: ww-input-radio
description: The ww-input-radio component provides a customizable group of radio buttons for selecting a single option from a list, with features for dynamic data binding, layout configuration, and label customization.
keywords:
  - radio buttons
  - single selection
  - options array
  - dynamic updating
  - labelfield
  - valuefield
  - layout direction
  - gap spacing
  - flexbox alignment
  - data binding
---

#### ww-input-radio

Component Purpose: Renders a group of radio buttons for single option selection.

Properties:
- options: Array<{label: string, value: string|number}> - List of choices. Default: [{value:'first value',label:'first label'},{value:'second value',label:'second label'}]
- value: string|number - Initial selected value. Default: ''
- labelField: string - Field for option label. Default: null
- valueField: string - Field for option value. Default: null
- required: boolean - Input requirement. Default: true
- direction: 'column'|'row' - Layout direction. Default: 'column'
- rowGap: string - Row spacing. Default: undefined
- columnGap: string - Column spacing. Default: undefined
- justifyContent: 'flex-start'|'center'|'flex-end'|'space-around'|'space-between' - Main axis alignment. Default: 'center'
- alignItems: 'flex-start'|'center'|'flex-end'|'stretch'|'baseline' - Cross axis alignment. Default: 'flex-start'
- flexWrap: boolean - Enable wrapping. Default: true

Children:
- choicesElement: ww-text - Label text renderer for options

Events:
- change: {value: string} - Triggered when radio selection changes
- initValueChange: {value: string} - Triggered when initial value changes

Variables:
- value: string|number - Current selected radio value
