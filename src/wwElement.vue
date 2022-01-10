<template v-if="content">
    <div class="ww-form-radio">
        <div v-for="(option, index) in content.choices" :key="index" class="ww-form-radio__container">
            <input
                v-if="option && option.value"
                :id="`${wwElementState.name}-${option.value}`"
                v-model="value"
                class="ww-form-radio__radio"
                :class="{ editing: isEditing }"
                type="radio"
                :name="wwElementState.name"
                :value="option.value"
                :required="content.required"
            />
            <component
                :is="isEditing ? 'div' : 'label'"
                v-if="option && option.value"
                :for="`${wwElementState.name}-${option.value}`"
            >
                <wwElement v-if="content.choicesElements[index]" v-bind="content.choicesElements[index]" />
            </component>
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
    },
    emits: ['update:content:effect', 'update:sidepanel-content', 'trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable(props.uid, 'value', '');
        return { variableValue, setValue };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value: {
            get() {
                return `${this.variableValue}`;
            },
            set(value) {
                if (value !== undefined && value !== this.variableValue) {
                    this.$emit('trigger-event', { name: 'change', event: { value } });
                    this.setValue(value);
                }
            },
        },
        options() {
            if (!this.content.choices) return;
            let data = this.content.choices;
            if (data && !Array.isArray(data)) {
                data = new Array(data);
            }

            return data.map(option => ({ value: typeof data[0] === 'object' ? option.value : option }));
        },
    },
    /* wwEditor:start */
    watch: {
        'content.choices': {
            async handler(newProperties, oldProperties) {
                if (_.isEqual(newProperties, oldProperties)) return;
                if (!this.content.choicesElements) return;

                let choicesElements = _.cloneDeep(this.content.choicesElements);
                this.$emit('update:sidepanel-content', {
                    path: 'choicesElements',
                    value: choicesElements.map(async () => ({
                        isWwObject: true,
                        uid: await wwLib.wwElementHelper.create('ww-text'),
                    })),
                });
            },
            deep: true,
        },
    },
    /* wwEditor:end */
};
</script>

<style lang="scss" scoped>
.ww-form-radio {
    &__container {
        padding: var(--ww-spacing-01) 0;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
    }
    &__radio {
        outline: none;
        margin-right: var(--ww-spacing-01);
        /* wwEditor:start */
        &.editing {
            pointer-events: none;
        }
        /* wwEditor:end */
    }
}
</style>
