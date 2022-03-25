<template v-if="content">
    <div class="ww-input-radio">
        <div v-for="(option, index) in options" :key="index" class="ww-input-radio__container">
            <template v-if="option">
                <input
                    :id="`${wwElementState.name}-${uniqueId}-${option.label}`"
                    :value="option.value"
                    :checked="option.value === value"
                    class="ww-input-radio__radio"
                    :class="{ editing: isEditing }"
                    type="radio"
                    :name="wwElementState.name"
                    :required="content.required"
                    @input="handleManualInput($event.target.value)"
                />
                <component
                    :is="isEditing ? 'div' : 'label'"
                    :for="`${wwElementState.name}-${uniqueId}-${option.label}`"
                >
                    <wwElement v-bind="content.choicesElement" :ww-props="{ text: option.label }" />
                </component>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['trigger-event', 'update:content:effect', 'update:sidepanel-content'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: props.content.value === undefined ? '' : props.content.value
        });
        return { variableValue, setValue, uniqueId: wwLib.wwUtils.getUid() };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            return this.variableValue;
        },
        options() {
            if (!this.content.options) return;
            let data = this.content.options;
            if (data && !Array.isArray(data) && typeof data === 'object') {
                data = new Array(data);
            } else if ((data && !Array.isArray(data)) || typeof data !== 'object') {
                return [];
            }

            return data
                .filter(item => !!item)
                .map(item => {
                    if (typeof item !== 'object') return { label: item, value: item };
                    return {
                        label: wwLib.wwLang.getText(item[this.content.labelField || 'label'] || ''),
                        value: item[this.content.valueField || 'value'],
                    };
                });
        },
    },
    watch: {
        /* wwEditor:start */
        'content.options': {
            immediate: true,
            handler(options) {
                const objectOptions = (options || []).filter(option => option && typeof option === 'object');
                if (objectOptions[0]) {
                    this.$emit('update:sidepanel-content', {
                        path: 'itemsProperties',
                        value: Object.keys(objectOptions[0]),
                    });
                } else {
                    this.$emit('update:sidepanel-content', { path: 'itemsProperties', value: [] });
                }
            },
        },
        'wwEditorState.sidepanelContent.itemsProperties'(newProperties, oldProperties) {
            if (_.isEqual(newProperties, oldProperties)) return;
            if (this.wwEditorState.boundProps.options && newProperties && newProperties[0]) {
                this.$emit('update:content:effect', { labelField: newProperties[0], valueField: newProperties[0] });
            } else {
                this.$emit('update:content:effect', { labelField: null, valueField: null });
            }
        },
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { labelField: null, valueField: null });
        },
        /* wwEditor:end */
        'content.value'(newValue) {
            newValue = `${newValue}`;
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        handleManualInput(value) {
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { value } });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-radio {
    &__container {
        padding: 0.4rem 0;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
    }
    &__radio {
        outline: none;
        margin-right: 0.4rem;
        /* wwEditor:start */
        &.editing {
            pointer-events: none;
        }
        /* wwEditor:end */
    }
}
</style>
