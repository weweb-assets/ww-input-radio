<template>
    <div class="ww-input-radio-wrapper" :style="wrapperStyle">
        <input
            class="ww-input-radio"
            ref="inputRef"
            v-model="isInternalChecked"
            :class="{ 'no-apperance': content.appearance === 'custom' }"
            :name="name"
            :value="value"
            :required="isRequired"
            :style="inputStyle"
            :checked="isChecked"
            :disabled="isDisabled"
            :readonly="isReadonly || isEditing"
            ww-responsive="radio-input"
            type="radio"
            @click="handleClick"
        />
        <!-- Editor click overlay -->
        <div v-if="isEditing" class="ww-editor-click-overlay" @click="handleEditorClick"></div>
    </div>
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
        wrapperStyle() {
            return {
                position: 'relative',
                display: 'inline-block',
                ...this.style
            };
        },
        inputStyle() {
            // Return empty object since styles are now on wrapper
            return {};
        },
    },
    methods: {
        handleClick(event) {
            // Keep original functionality
        },
        handleEditorClick(event) {
            /* wwEditor:start */
            // Let the click bubble naturally for editor selection
            console.log('[Radio Debug] Editor overlay clicked');
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
.ww-input-radio-wrapper {
    position: relative;
    display: inline-block;
}

.ww-input-radio {
    &:focus-visible {
        outline: none;
    }
    
    &.no-apperance {
        appearance: none;
    }
}

/* wwEditor:start */
.ww-editor-click-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    cursor: pointer;
    // Transparent but clickable
    background: transparent;
}
/* wwEditor:end */
</style>
