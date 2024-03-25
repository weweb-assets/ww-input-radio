import { ref, inject, computed } from 'vue';

export default function useWewebRadio(props) {
    return {
        isChecked: inject('_wwRadioIsChecked', ref(false)),
        name: inject(
            '_wwRadioName',
            computed(() => props.content.name)
        ),
        value: inject('_wwRadioValue', undefined),
        select: inject('_wwRadioSelect', () => {}),
    };
}
