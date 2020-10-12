import wwRadioPopupConfig from './wwRadioPopupConfig.vue';

wwLib.wwPopups.addPopup('wwRadioPopupConfig', wwRadioPopupConfig);

wwLib.wwPopups.addStory('WWFORM_RADIO_CONFIG', {
    title: {
        en: 'Radio Configuration',
        fr: 'Configuration du bouton radio',
    },
    type: 'wwRadioPopupConfig',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider',
            },
            next: false,
        },
    },
});
