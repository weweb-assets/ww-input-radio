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
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
        radioLayout: {
            hidden: true,
            defaultValue: [],
        },
    },
};
