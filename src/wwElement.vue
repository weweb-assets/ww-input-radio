<template>
    <input
        class="ww-input-radio"
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
        :disabled="isReadonly"
        ww-responsive="radio-input"
        type="radio"
    />
</template>

<script>
import useWewebRadio from './useWewebRadio';

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
        const { isChecked, name, value, select, isRequired, isReadonly: isParentReadonly } = useWewebRadio(props);
        return { isChecked, name, value, select, isParentReadonly, isRequired };
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
        style() {
            if (this.content.appearance === 'custom') {
                return {
                    '--outline-color': this.content.outline,
                    '--inside-color': this.content.inside,
                    '--size': this.content.size,
                    '--ringSize': this.content.ringSize,
                };
            }
            return {
                '--size': this.content.size,
            };
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
    outline: none;
    margin: 0;
    padding: 0;
    &.no-apperance {
        appearance: none;
    }
    /* wwEditor:start */
    &.-editing {
        pointer-events: none;
    }
    /* wwEditor:end */
    border-radius: 50%;
    width: var(--size, 16px);
    height: var(--size, 16px);
    border: var(--ringSize, 2px) solid;
    border-color: var(--outline-color, initial);
    background: var(--inside-color, initial);
    transition: inherit;

    &:checked {
        border: var(--ringSize, 6px) solid;
        border-color: var(--outline-color, initial);
    }
}
</style>
