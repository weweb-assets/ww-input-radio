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
        outline: {
            type: 'Color',
            label: 'Outline color',
            options: {
                nullable: true,
            },
            states: true,
            bindable: true,
            classes: true,
            hidden: content => content.appearance !== 'custom',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip:
                    'You need to set a string representing a **color** value. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">[MDN Doc]</a>`',
            },
            /* wwEditor:end */
        },
        inside: {
            type: 'Color',
            label: 'Inside color',
            options: {
                nullable: true,
            },
            states: true,
            bindable: true,
            classes: true,
            hidden: content => content.appearance !== 'custom',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip:
                    'You need to set a string representing a **color** value. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">[MDN Doc]</a>`',
            },
            /* wwEditor:end */
        },
        size: {
            type: 'Length',
            label: 'Size',
            options: {
                noRange: true,
            },
            states: true,
            bindable: true,
            classes: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip:
                    'You need to set a string representing a **length** value. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/length" target="_blank">[MDN Doc]</a>`',
            },
            /* wwEditor:end */
        },
        ringSize: {
            type: 'Length',
            label: 'Outline width',
            options: {
                noRange: true,
            },
            states: true,
            bindable: true,
            classes: true,
            hidden: content => content.appearance !== 'custom',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip:
                    'You need to set a string representing a **length** value. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/length" target="_blank">[MDN Doc]</a>`',
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
