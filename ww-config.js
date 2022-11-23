export default {
    editor: {
        label: { fr: 'Choix de Formulaire', en: 'Form Radio' },
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On Change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On Init value change' }, event: { value: '' } },
    ],
    customStylePropertiesOrder: ['direction', ['rowGap', 'columnGap'], ['justifyContent', 'alignItems'], 'flexWrap'],
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
        direction: {
            label: { en: 'Direction', fr: 'Direction' },
            type: 'BigIconRadioGroup',
            options: {
                choices: [
                    { icon: 'arrow-down', value: 'column', label: 'Vertical' },
                    { icon: 'arrow-right', value: 'row', label: 'Horizontal' },
                ],
            },
            responsive: true,
            defaultValue: 'column',
        },
        rowGap: {
            label: 'Rows gap',
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2 },
                    { value: 'em', label: 'em', min: 0, max: 10, digits: 2 },
                    { value: 'rem', label: 'rem', min: 0, max: 10, digits: 2 },
                ],
            },
        },
        columnGap: {
            label: 'Columns gap',
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2 },
                    { value: 'em', label: 'em', min: 0, max: 10, digits: 2 },
                    { value: 'rem', label: 'rem', min: 0, max: 10, digits: 2 },
                ],
            },
        },
        justifyContent: {
            label: { en: 'Justify' },
            type: 'TextRadioGroup',
            options: content => {
                if (content.direction === 'row') {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
                            {
                                value: 'space-around',
                                title: { en: 'Space around', fr: 'Space around' },
                                icon: 'align-x-space-around',
                            },
                            {
                                value: 'space-between',
                                title: { en: 'Space between', fr: 'Space between' },
                                icon: 'align-x-space-between',
                            },
                        ],
                    };
                } else {
                    return {
                        choices: [
                            {
                                value: 'flex-start',
                                title: { en: 'Start', fr: 'Début' },
                                icon: 'align-x-start-vertical',
                            },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center-vertical' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end-vertical' },
                            {
                                value: 'space-around',
                                title: { en: 'Space around', fr: 'Space around' },
                                icon: 'align-x-space-around-vertical',
                            },
                            {
                                value: 'space-between',
                                title: { en: 'Space between', fr: 'Space between' },
                                icon: 'align-x-space-between-vertical',
                            },
                        ],
                    };
                }
            },
            responsive: true,
            defaultValue: 'center',
        },
        alignItems: {
            label: { en: 'Alignment' },
            type: 'TextRadioGroup',
            options: content => {
                if (content.direction === 'row') {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-y-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-y-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-y-end' },
                            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-y-stretch' },
                            { value: 'baseline', title: { en: 'Baseline', fr: 'Baseline' }, icon: 'align-y-baseline' },
                        ],
                    };
                } else {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
                            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-x-stretch' },
                        ],
                    };
                }
            },
            responsive: true,
            defaultValue: 'flex-start',
        },
        flexWrap: {
            label: { en: 'Wrap elements' },
            type: 'OnOff',
            hidden: content => content.direction !== 'row',
            responsive: true,
            defaultValue: true,
        },
    },
};
