export default {
    editor: {
        label: { fr: 'Choix de Formulaire', en: 'Form Radio' },
    },
    properties: {
        choices: {
            label: { en: 'Choices values', fr: 'Choices values' },
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            value: {
                                label: { en: 'Value' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [{ value: 'first value' }, { value: 'second value' }],
            bindable: true,
        },
        choicesElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
    },
};
