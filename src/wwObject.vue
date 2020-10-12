<template>
    <div class="ww-form-radio">
        <div class="elem-radio" v-for="option in content.config.options" :key="option.id">
            <input
                class="radio"
                :class="{ 'ww-editing': isEditing }"
                type="radio"
                :name="content.config.name"
                :value="option.value"
                :required="content.config.required"
            />
            <wwObject class="text" v-bind="option.wwObject"></wwObject>
        </div>
    </div>
</template>

<script>
/* wwEditor:start */
import openPopup from './popups';
/* wwEditor:end */

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        config: {
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
    data() {
        return {
            wwLang: wwLib.wwLang,
        };
    },
    computed: {
        isEditing() {
            return this.wwEditorState.editMode === wwLib.wwSectionHelper.EDIT_MODES.CONTENT;
        },
    },
    /* wwEditor:start */
    methods: {
        async setOptions() {
            const result = await openPopup(this.content);
            if (result) this.$emit('update', result);
        },
    },
    /* wwEditor:end */
};
</script>

<style lang="scss" scoped>
.ww-form-radio {
    .elem-radio {
        padding: 5px 0;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        .radio {
            outline: none;
            margin-right: 5px;
            /* wwEditor:start */
            &.ww-editing {
                pointer-events: none;
            }
            /* wwEditor:end */
        }
        .text {
            width: 100%;
        }
    }
}
</style>
