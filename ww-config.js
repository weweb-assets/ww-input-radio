export default {
    editor: {
        label: { fr: 'Choix de Formulaire', en: 'Form Radio' },
    },
    properties: {
        name: {
            label: { en: 'Name', fr: 'Name' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Name' },
            defaultValue: 'name',
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        choices: {
            label: { en: 'Choices values', fr: 'Choices values' },
            type: 'List',
            section: 'settings',
            options: {
                options: [{ path: 'value', type: 'Text', options: { placeholder: 'Value' } }],
            },
            defaultValue: [
                { value: 'first value', wwObject: { isWwObject: true, type: 'ww-text' } },
                { value: 'second value', wwObject: { isWwObject: true, type: 'ww-text' } },
            ],
        },
    },
};
