<template>
    <input
        class="ww-input-radio"
        ref="inputRef"
        v-model="isInternalChecked"
        :class="{ 'no-apperance': content.appearance === 'custom' }"
        :name="name"
        :value="value"
        :required="isRequired"
        :style="style"
        :checked="isChecked"
        :disabled="isDisabled"
        :readonly="isReadonly || isEditing"
        ww-responsive="radio-input"
        type="radio"
        @click="handleClick"
    />
</template>

<script>
import useWewebRadio from './useWewebRadio';

import { ref, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['add-state', 'remove-state'],
    setup(props) {
        const inputRef = ref(null);

        const {
            isChecked,
            name,
            value,
            select,
            isRequired,
            isReadonly: isParentReadonly,
            isDisabled,
            clicked,
            resetClicked,
        } = useWewebRadio(props);

        watch(clicked, value => {
            if (value) {
                inputRef.value.focus();
                resetClicked();
            }
        });

        return { inputRef, isChecked, name, value, select, isParentReadonly, isDisabled, isRequired };
    },
    computed: {
        isInternalChecked: {
            get() {
                return this.isChecked;
            },
            set(value) {
                if (value) {
                    if (!this.isEditing) this.select();
                }
            },
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.isEditing;
            /* wwEditor:end */
        },
        isReadonly() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return this.isParentReadonly || this.content.readonly;
        },
    },
    methods: {
        handleClick(event) {
            /* wwEditor:start */
            // In editor mode, manually bubble the event if readonly
            if (this.isEditing && this.isReadonly) {
                console.log('[Radio Debug] Click on readonly radio in editor, manually bubbling event');
                // Create a new click event that bubbles
                const newEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: event.clientX,
                    clientY: event.clientY,
                });
                // Dispatch on parent element to ensure it bubbles up
                if (this.$el.parentElement) {
                    this.$el.parentElement.dispatchEvent(newEvent);
                }
            }
            /* wwEditor:end */
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
};
</script>

<style lang="scss" scoped>
.ww-input-radio {
    &:focus-visible {
        outline: none;
    }
    
    &.no-apperance {
        appearance: none;
    }
    
    /* wwEditor:start */
    // Force pointer events in editor to allow selection
    pointer-events: auto !important;
    /* wwEditor:end */
}
</style>
