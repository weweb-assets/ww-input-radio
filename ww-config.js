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
        outline: {
            type: 'Color',
            label: 'Outline color',
            options: {
                nullable: true,
            },
            states: true,
            bindable: true,
            classes: true,
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
        },
    },
};
