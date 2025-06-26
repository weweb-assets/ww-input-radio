<template>
    <input
        class="ww-input-radio"
        ref="inputRef"
        :id="inputId"
        v-bind="$attrs"
        :class="{ 'no-appearance': content.appearance === 'custom' }"
        :name="name"
        :value="value"
        :required="isRequired"
        :checked="isChecked"
        :disabled="isDisabled"
        :readonly="isReadonly"
        ww-responsive="radio-input"
        type="radio"
        @change="handleChange"
        @click="handleClick"
    />
</template>

<script>
import useWewebRadio from './useWewebRadio';
import { ref, inject, computed, useId } from 'vue';

export default {
    inheritAttrs: false,
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['add-state', 'remove-state', 'update:sidepanel-content'],
    setup(props, { emit }) {
        const inputRef = ref(null);

        // Generate unique ID for the radio input
        const generatedId = `ww-input-radio-${useId()}`;

        // Use custom ID if set, otherwise use generated ID
        const inputId = computed(() => props.wwElementState.props?.attributes?.id || generatedId);

        // Register with parent label if available
        const useLabelChild = inject('_wwLabel:useLabelChild', null);

        // Create computed name for label - should show radio value
        const radioLabelName = computed(() => {
            return props.content.value || 'Radio option';
        });

        // Register with label if inside one
        if (useLabelChild) {
            useLabelChild(props.wwElementState.uid, radioLabelName);
        }

        const {
            isChecked,
            name,
            value,
            select,
            isRequired,
            isReadonly: composableReadonly,
            isDisabled,
            insideRadioGroup,
        } = useWewebRadio(props, emit);

        return {
            inputRef,
            inputId,
            isChecked,
            name,
            value,
            select,
            composableReadonly,
            isDisabled,
            isRequired,
            insideRadioGroup,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            const editing = this.wwEditorState.isEditing;
            console.log('[Radio] isEditing computed:', editing, 'wwEditorState:', this.wwEditorState);
            return editing;
            /* wwEditor:end */
            return false;
        },
        isReadonly() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return this.composableReadonly || this.content.readonly;
        },
    },
    watch: {
        isChecked: {
            handler(isChecked) {
                if (isChecked) {
                    this.$emit('add-state', 'checked');
                } else {
                    this.$emit('remove-state', 'checked');
                }
            },
            immediate: true,
        },
        isReadonly: {
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'readonly');
                } else {
                    this.$emit('remove-state', 'readonly');
                }
            },
            immediate: true,
        },
    },
    methods: {
        handleClick(event) {
            console.log('[Radio] handleClick - isEditing:', this.isEditing);
            if (this.isEditing) {
                console.log('[Radio] Preventing click in edit mode');
                event.preventDefault();
                event.stopPropagation();
            }
        },
        handleChange(event) {
            console.log('[Radio] handleChange - isEditing:', this.isEditing, 'checked:', event.target.checked);
            // Prevent default and stop the change in editing mode
            if (this.isEditing) {
                console.log('[Radio] Preventing change in edit mode');
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            // For normal operation, trigger select
            if (event.target.checked) {
                console.log('[Radio] Radio checked, calling select()');
                this.select();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-radio {
    cursor: pointer;

    &[readonly],
    &[disabled] {
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: none;
    }

    &.no-appearance {
        appearance: none;
    }
}
</style>
