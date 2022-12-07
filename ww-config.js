export default {
    editor: {
        label: { fr: 'Choix de Formulaire', en: 'Form Radio' },
        icon:"radio",
        deprecated: 'Use a radio input from the Elements panel instead of this one.',
    },
    properties: {
        globalSettings: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    name: {
                        label: { en: 'Name', fr: 'Name' },
                        type: 'Text',
                        options: { placeholder: 'Name' },
                    },
                    required: {
                        label: { en: 'Required', fr: 'Requis' },
                        type: 'OnOff',
                    },
                    choices: {
                        label: { en: 'Choices values', fr: 'Choices values' },
                        type: 'Array',
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
                    },
                },
            },
            defaultValue: {
                name: '',
                required: true,
                choices: [
                    { value: 'first value', wwObject: { isWwObject: true, type: 'ww-text' } },
                    { value: 'second value', wwObject: { isWwObject: true, type: 'ww-text' } },
                ],
            },
        },
    },
};
