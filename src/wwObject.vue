<template>
    <div class="elem-radios">
        <div class="elem-radio" v-for="option in wwObject.content.data.config.options" :key="option.id">
            <div class="radio">
                <input type="radio" :name="wwObject.content.data.config.name" :value="option.value" :required="wwObject.content.data.config.required" />
            </div>
            <div class="text">
                <wwObject :ww-object="option.wwObject"></wwObject>
            </div>
        </div>
    </div>
</template>

<script>
/* wwManager:start */
import wwRadioPopupConfig from "./popup/wwRadioPopupConfig.vue";

wwLib.wwPopups.addPopup("wwRadioPopupConfig", wwRadioPopupConfig);

wwLib.wwPopups.addStory("WWFORM_RADIO_CONFIG", {
    title: {
        en: "Radio Configuration",
        fr: "Configuration du bouton radio"
    },
    type: "wwRadioPopupConfig",
    buttons: {
        OK: {
            text: {
                en: "Ok",
                fr: "Valider"
            },
            next: false
        }
    }
});

wwLib.wwPopups.addStory("WWFORM_RADIO_OPTIONS", {
    title: {
        en: "Edit Radio",
        fr: "Editer le bouton radio"
    },
    type: "wwPopupEditWwObject",
    buttons: null,
    storyData: {
        list: {
            RADIO_CONFIG: {
                separator: {
                    en: "Configuration",
                    fr: "Configuration"
                },
                title: {
                    en: "Change radio configuration",
                    fr: "Changer la configuration de bouton radio"
                },
                desc: {
                    en: "",
                    fr: ""
                },
                icon: "wwi wwi-config",
                shortcut: "c",
                next: "WWFORM_RADIO_CONFIG"
            }
        }
    }
});
/* wwManager:end */

export default {
    name: "ww-form-radio",
    props: {
        wwObjectCtrl: Object
    },
    data() {
        return {
            wwLang: wwLib.wwLang
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        }
    },
    methods: {
        init() {
            this.wwObject.content.data = this.wwObject.content.data || {};
            this.wwObject.content.data.config = this.wwObject.content.data.config || {};

            if (this.wwObject.content.data.isNew) {
                this.wwObject.content.data.config.options = [
                    {
                        value: "value",
                        wwObject: wwLib.wwObject.getDefault({ type: "ww-text" })
                    },
                    {
                        value: "value2",
                        wwObject: wwLib.wwObject.getDefault({ type: "ww-text" })
                    }
                ];

                delete this.wwObject.content.data.isNew;
            }

            this.wwObjectCtrl.update(this.wwObject);
        },
        /* wwManager:start */
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)); // to clean
            copyObj.uniqueId += 1;
            let options = {
                firstPage: "WWFORM_RADIO_OPTIONS",
                data: {
                    wwObject: copyObj
                }
            };
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);
                /*=============================================m_ÔÔ_m=============================================\
                    RADIO CONFIG
                \================================================================================================*/
                this.wwObject.content.data.config = this.wwObject.content.data.config || {};
                if (typeof result.radioConfig != "undefined") {
                    if (typeof result.radioConfig.required != "undefined") {
                        this.wwObject.content.data.config.required = result.radioConfig.required;
                    }
                    if (typeof result.radioConfig.name != "undefined") {
                        this.wwObject.content.data.config.name = result.radioConfig.name;
                    }
                    if (typeof result.radioConfig.options != "undefined") {
                        this.wwObject.content.data.config.options = result.radioConfig.options;
                    }
                    this.wwObjectCtrl.update(this.wwObject);
                }
                this.wwObjectCtrl.globalEdit(result);
            } catch (err) {
                wwLib.wwLog.error("ERROR", err);
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    mounted() {
        this.init();

        this.$emit("ww-loaded", this);
    }
};
</script>

<style lang="scss" scoped>
.elem-radios {
    .elem-radio {
        padding: 5px 0;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        .radio {
            outline: none;
            margin-right: 5px;
        }
        .text {
            width: 100%;
        }
    }
}
</style>
