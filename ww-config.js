export default {
    editor: {
        label: 'Input Radio',
        icon: 'radio',
    },
    options: {
        autoByContent: true,
    },
    states: ['checked', 'readonly'],
    customSettingsPropertiesOrder: [
        'radioInfobox',
        'value',
        'appearance',
        'readonly',
    ],
    properties: {
        radioState: {
            editorOnly: true,
            hidden: true,
            defaultValue: {
                insideRadioGroup: false,
                groupName: null,
            },
        },
        radioInfobox: {
            type: "InfoBox",
            section: "settings",
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.radioState?.insideRadioGroup ? "success" : "warning",
                icon: "radio",
                title: sidePanelContent.radioState?.insideRadioGroup 
                    ? `Connected to: ${sidePanelContent.radioState?.groupName || 'Radio group'}` 
                    : "Standalone radio",
                content: !sidePanelContent.radioState?.insideRadioGroup && 
                    "Place this radio inside a radio group for proper functionality.",
            }),
            /* wwEditor:start */
            hidden: (_, sidePanelContent) => !!sidePanelContent.radioState?.insideRadioGroup,
            /* wwEditor:end */
        },
        value: {
            label: 'Value',
            type: 'Text',
            section: 'settings',
            bindable: true,
            required: true,
            defaultValue: '',
            propertyHelp: {
                tooltip: 'The value that will be emitted when this radio is selected',
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string or number that represents this radio option: `"option1"` or `1`',
            },
            /* wwEditor:end */
        },
        appearance: {
            label: 'Appearance',
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { label: 'Simple', value: 'simple', default: true },
                    { label: 'Custom', value: 'custom' },
                ],
            },
            defaultValue: 'simple',
            bindable: true,
            responsive: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'The appearance of the radio input: `simple | custom`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
    },
};