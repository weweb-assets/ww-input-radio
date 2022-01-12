<template v-if="content.globalSettings">
    <div class="ww-form-radio">
        <div v-for="(option, index) in content.globalSettings.choices" :key="index" class="ww-form-radio__container">
            <template v-if="option && option.value">
                <input
                    :id="`${content.globalSettings.name}-${option.value}`"
                    class="ww-form-radio__radio"
                    :class="{ editing: isEditing }"
                    type="radio"
                    :name="content.globalSettings.name"
                    :value="option.value"
                    :checked="option.value === internalValue"
                    :required="content.globalSettings.required"
                    @input="setInternalValue(option.value)"
                />
                <component :is="isEditing ? 'div' : 'label'" :for="`${content.globalSettings.name}-${option.value}`">
                    <wwElement v-if="option.wwObject" v-bind="option.wwObject" />
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
    },
    emits: ['update:content:effect'],
    data() {
        return {
            internalValue: null,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
    /* wwEditor:start */
    watch: {
        'content.globalSettings.choices': {
            async handler() {
                if (!this.content.globalSettings) return;
                const choices = _.cloneDeep(this.content.globalSettings.choices);
                for (const option of choices) {
                    if (option.wwObject) continue;
                    option.wwObject = { isWwObject: true, uid: await wwLib.wwElementHelper.create('ww-text') };
                    this.$emit('update:content:effect', {
                        globalSettings: { ...this.content.globalSettings, choices },
                    });
                }
            },
            deep: true,
        },
    },
    /* wwEditor:end */
    methods: {
        setInternalValue(value) {
            this.internalValue = value;
        },
    },
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
