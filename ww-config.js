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
                            wwObject: { isWwObject: true, type: 'ww-text', hidden: true },
                        },
                    },
                },
            },
            defaultValue: [
                { value: 'first value', wwObject: { isWwObject: true, type: 'ww-text' } },
                { value: 'second value', wwObject: { isWwObject: true, type: 'ww-text' } },
            ],
            bindable: true,
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
    },
};
