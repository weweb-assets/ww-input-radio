export default {
    editor: {
        label: { fr: 'Choix de Formulaire', en: 'Form Radio' },
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On Change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On Init value change' }, event: { value: '' } },
    ],

    properties: {
        options: {
            label: { en: 'Choices values', fr: 'Choices values' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            label: {
                                label: { en: 'Label' },
                                type: 'Text',
                                options: { placeholder: 'Label' },
                            },
                            value: {
                                label: { en: 'Value' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { value: 'first value', label: 'first label' },
                { value: 'second value', label: 'second label' },
            ],
            multilang: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip:
                    'A collection of data in array format: \n\n `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the initial value: `"first value"`',
            },
            /* wwEditor:end */
        },
        labelField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Label field',
                fr: 'Label field',
            },
            type: 'TextSelect',
            options: (content, sidepanelContent) => {
                const data = content.options;
                const options = sidepanelContent.itemsProperties
                    .map(item => {
                        return data && (typeof data[0][item] === 'string' || typeof data[0][item] === 'number')
                            ? { value: item, label: { en: item } }
                            : null;
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: null, label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: null,
            section: 'settings',
        },
        valueField: {
            hidden: (content, sidepanelContent, boundProps) =>
                !boundProps.options || !content.options || (content.options && typeof content.options[0] !== 'object'),
            label: {
                en: 'Value field',
                fr: 'Value field',
            },
            type: 'TextSelect',
            options: (content, sidepanelContent) => {
                const options = sidepanelContent.itemsProperties
                    .map(item => {
                        return { value: item, label: { en: item } };
                    })
                    .filter(item => !!item);

                return {
                    options: [{ value: null, label: { en: 'Select a property' } }, ...options],
                };
            },
            defaultValue: null,
            section: 'settings',
        },
        choicesElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
        itemsProperties: {
            hidden: true,
            defaultValue: [],
            editorOnly: true,
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is required: `true | false`',
            },
            /* wwEditor:end */
        },
    },
};
