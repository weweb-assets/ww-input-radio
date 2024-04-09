<template>
    <input
        class="ww-input-radio"
        @change="onChange"
        :class="{ /* wwEditor:start */ '-editing': isEditing /* wwEditor:end */ }"
        :name="name"
        :value="value"
        :checked="isChecked"
        :required="isRequired"
        :style="style"
        :readonly="isReadonly"
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
        style() {
            return {
                '--outline-color': this.content.outline,
                '--inside-color': this.content.inside,
                '--size': this.content.size,
                '--ringSize': this.content.ringSize,
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
    methods: {
        onChange(event) {
            if (event.target.checked) {
                this.select();
            }
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
    appearance: none;
    outline: none;
    margin: 0;
    padding: 0;
    /* wwEditor:start */
    &.-editing {
        pointer-events: none;
    }
    /* wwEditor:end */
    border-radius: 50%;
    width: var(--size, 16px);
    height: var(--size, 16px);
    border: var(--ringSize, 2px) solid var(--outline-color, black);
    background: var(--inside-color, transparent);
    transition: inherit;

    &:checked {
        border: var(--ringSize, 6px) solid var(--outline-color, black);
    }
}
</style>
