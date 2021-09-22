<template>
    <div class="ww-form-radio">
        <div v-for="option in content.choices" :key="option.id" class="ww-form-radio__container">
            <input
                :id="`${content.name}-${option.value}`"
                class="ww-form-radio__radio"
                :class="{ editing: isEditing }"
                type="radio"
                :name="content.name"
                :value="option.value"
                :required="content.required"
            />
            <component :is="isEditing ? 'div' : 'label'" :for="`${content.name}-${option.value}`">
                <wwElement v-if="option.wwObject" v-bind="option.wwObject" />
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
    },
    emits: ['update:content:effect'],
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
        'content.choices': {
            async handler() {
                if (!this.content) return;
                const choices = _.cloneDeep(this.content.choices);
                for (const option of choices) {
                    if (option.wwObject) continue;
                    option.wwObject = { isWwObject: true, uid: await wwLib.wwElementHelper.create('ww-text') };
                    this.$emit('update:content:effect', { choices });
                }
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
