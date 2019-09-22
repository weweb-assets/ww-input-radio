import wwObject from './wwObject.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            /* wwManager:start */
            cmsOptions: {
                wwObjectMenu: {
                    items: [
                        {
                            name: 'OPTIONS',
                            text: {
                                en: 'Options...',
                                fr: 'Options...'
                            },
                            main: true,
                            icon: 'wwi wwi-edit-other',
                            action: 'options'
                        }
                    ]
                }
            },
            /* wwManager:end */
            content: {
                type: name,
                data: {
                    config: {
                        name: 'name',
                        required: true,
                        options: [{
                            value: 'value',
                            wwObject: wwLib.wwObject.getDefault({ type: 'ww-text' })
                        }, {
                            value: 'value2',
                            wwObject: wwLib.wwObject.getDefault({ type: 'ww-text' })
                        }]
                    }
                }
            },
            upsales: {
                wwAnalytics: {
                    click: true
                }
            }
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}