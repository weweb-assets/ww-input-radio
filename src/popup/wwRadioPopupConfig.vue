<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <wwManagerInput class="input" color="orange" v-model="result.radioConfig.name" :label="`Name`"></wwManagerInput>
            </div>
            <div class="elem">
               <div class="title">Required</div>
                <wwManagerRadio class="radio" v-model="result.radioConfig.required"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Options</div>
                <div class="option" v-for="(option, index) in result.radioConfig.options" :key="option.id">
                    <wwManagerInput class="input" :color="{ 'green': option.value.length, 'red': !option.value.length }" v-model="option.value" label="Value"></wwManagerInput>
                    <wwManagerButton class="close" center color="red" @click="removeOption(index)">Remove Option</wwManagerButton>
                </div>
                <wwManagerButton class="input" center color="orange" @click="addOption">Add option</wwManagerButton>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwRadioPopupStyle",
    props: {
        options: {
            type: Object,
            default() {
                return {
                }
            }
        },
    },
    data() {
        return {
            wwLang: wwLib.wwLang,
            wwObject: this.options.data.wwObject,
            result: {
                radioConfig: {
                    name: '',
                    required: false,
                    options: []
                }
            }
        };
    },
    methods: {
        init() {
            this.result.radioConfig.required = this.wwObject.content.data.config.required || false
            this.result.radioConfig.name = this.wwObject.content.data.config.name
            this.result.radioConfig.options = this.wwObject.content.data.config.options
            this.options.result = this.result
        },
        addOption() {
             this.wwObject.content.data.config.options.push({
                value: '',
                wwObject: wwLib.wwObject.getDefault({ type: 'ww-text' })
            })
        },
        removeOption(index) {
            this.wwObject.content.data.config.options.splice(index, 1)
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
    }
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        padding: 20px;
        flex-wrap: wrap;
        overflow: auto;
        width: 100%;
        justify-content: center;
        font-family: "Monserrat", sans-serif;
        .elem {
            margin: 10px 33%;
            width: 33%;
            .input {
                width: 100%;
            }
            .select {
                width: 33%;
            }
            .option {
                margin-bottom: 20px;
            }
        }
        
        .title {
            color: #e02a4d;
            font-family: "Monserrat", sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>