<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <wwManagerInput
                    class="input"
                    color="orange"
                    v-model="result.config.name"
                    :label="`Name`"
                ></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Required</div>
                <wwManagerRadio class="radio" v-model="result.config.required"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Options</div>
                <div class="option" v-for="(option, index) in result.config.options" :key="option.id">
                    <wwManagerInput
                        class="input"
                        :color="{ green: option.value.length, red: !option.value.length }"
                        v-model="option.value"
                        label="Value"
                    ></wwManagerInput>
                    <wwManagerButton class="close" center invert color="red-gradient" @click="removeOption(index)">
                        &times;
                    </wwManagerButton>
                </div>
                <wwManagerButton class="input" center invert color="blue-gradient" @click="addOption">
                    Add option
                </wwManagerButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wwRadioPopupStyle',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            wwLang: wwLib.wwLang,
            content: this.options.data,
            result: {
                config: {
                    name: '',
                    required: false,
                    options: [],
                },
            },
        };
    },
    methods: {
        init() {
            this.result.config.required = this.content.config.required || false;
            this.result.config.name = this.content.config.name;
            this.result.config.options = this.content.config.options;
            this.options.result = this.result;
        },
        addOption() {
            this.content.config.options.push({
                value: '',
                wwObject: { isWwObject: true, type: 'ww-text' },
            });
        },
        removeOption(index) {
            this.content.config.options.splice(index, 1);
        },
    },
    created() {
        this.init();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        padding: 20px;
        flex-direction: column;
        overflow: auto;
        width: 100%;
        align-items: center;
        font-family: 'Monserrat', sans-serif;
        .elem {
            margin: 10px;
            width: 90%;
            @media (min-width: 992px) {
                width: 40%;
            }
            .input {
                width: 100%;
            }
            .select {
                width: 33%;
            }
            .option {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .close {
                    margin-left: 5px;
                }
            }
        }
        .title {
            color: #e02a4d;
            font-family: 'Monserrat', sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>
