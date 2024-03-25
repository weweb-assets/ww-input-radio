<template>
    <input
        class="ww-input-radio"
        @change="onChange"
        :class="{ /* wwEditor:start */ '-editing': isEditing /* wwEditor:end */ }"
        :name="name"
        :value="value"
        :checked="isChecked"
        :style="style"
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
        const { isChecked, name, value, select } = useWewebRadio(props);
        return { isChecked, name, value, select };
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
