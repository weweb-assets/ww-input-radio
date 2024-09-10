import { ref, inject, computed } from 'vue';

export default function useWewebRadio(props) {
    return {
        isChecked: inject('_wwRadioIsChecked', ref(false)),
        isReadonly: inject('_wwRadioIsReadonly', ref(false)),
        isRequired: inject('_wwRadioIsRequired', ref(false)),
        repeat: inject('_wwRepeat', ref(false)),
        name: inject(
            '_wwRadioName',
            computed(() => props.content.name)
        ),
        value: inject('_wwRadioValue', undefined),
        select: inject('_wwRadioSelect', () => {}),
    };
}
