export default {
    editor: {
        label: 'Input Radio',
        icon: 'radio',
    },
    options: {
        autoByContent: true,
    },
    states: ['checked', 'readonly'],
    properties: {
        appearance: {
            label: 'Appearance',
            type: 'TextSelect',
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
