<template>
    <div class="ww-form-radio" v-if="content.globalSettings">
        <div class="ww-form-radio__container" v-for="option in content.globalSettings.options" :key="option.id">
            <input
                class="ww-form-radio__radio"
                :class="{ editing: isEditing }"
                type="radio"
                :name="content.globalSettings.name"
                :value="option.value"
                :required="content.globalSettings.required"
            />
            <wwObject v-if="option.wwObject" v-bind="option.wwObject"></wwObject>
        </div>
    </div>
</template>

<script>
export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        globalSettings: {
            name: 'name',
            required: true,
            options: [
                {
                    value: 'first value',
                    wwObject: { isWwObject: true, type: 'ww-text' },
                },
                {
                    value: 'second value',
                    wwObject: { isWwObject: true, type: 'ww-text' },
                },
            ],
        },
    },
    /* wwEditor:start */
    watch: {
        'content.globalSettings.options': {
            async handler() {
                if (!this.content.globalSettings) return;
                const options = _.cloneDeep(this.content.globalSettings.options);
                for (const option of options) {
                    if (option.wwObject) continue;
                    option.wwObject = { isWwObject: true, uid: await wwLib.wwObjectHelper.create('ww-text') };
                    this.$emit('update', { globalSettings: { ...this.content.globalSettings, options } });
                }
            },
            deep: true,
        },
    },
    /* wwEditor:end */
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.isSelected;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
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
