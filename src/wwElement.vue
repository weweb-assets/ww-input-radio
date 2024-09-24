<template>
    <input
        class="ww-input-radio"
        ref="inputRef"
        v-model="isInternalChecked"
        :class="{
            /* wwEditor:start */
            '-editing': isEditing,
            /* wwEditor:end */
            'no-apperance': content.appearance === 'custom',
        }"
        :name="name"
        :value="value"
        :required="isRequired"
        :style="style"
        :checked="isChecked"
        :disabled="isReadonly || isDisabled"
        ww-responsive="radio-input"
        type="radio"
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
                    this.select();
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
    &.no-apperance {
        appearance: none;
    }
    /* wwEditor:start */
    &.-editing {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    }
    /* wwEditor:end */
}
</style>
