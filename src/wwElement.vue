<template>
    <div class="ww-input-radio-wrapper" v-bind="wrapperAttrs" @click="handleWrapperClick">
        <input
            class="ww-input-radio"
            ref="inputRef"
            v-model="isInternalChecked"
            :id="inputId"
            :style="$attrs.style"
            :class="{ 'no-appearance': content.appearance === 'custom' }"
            :name="name"
            :value="value"
            :required="isRequired"
            :checked="isChecked"
            :disabled="isDisabled"
            :readonly="isReadonly || isEditing"
            ww-responsive="radio-input"
            type="radio"
            @click.stop
        />
        <!-- Editor click overlay -->
        <div v-if="isEditing" class="ww-editor-click-overlay"></div>
    </div>
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
        isInternalChecked: {
            get() {
                return this.isChecked;
            },
            set(value) {
                if (value && !this.isEditing) {
                    this.select();
                }
            },
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.isEditing;
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
        wrapperAttrs() {
            // Get all attributes except style
            const { style, ...rest } = this.$attrs;
            return rest;
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
        handleWrapperClick() {
            // Allow clicking on the wrapper to select the radio
            if (!this.isEditing && !this.isReadonly) {
                this.select();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-radio-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
    
    &:has(input[readonly]),
    &:has(input[disabled]) {
        cursor: not-allowed;
    }
}

.ww-input-radio {
    cursor: inherit;
    
    &:focus-visible {
        outline: none;
    }
    
    &.no-appearance {
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