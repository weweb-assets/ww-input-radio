import { ref, inject, computed } from 'vue';

export default function useWewebRadio(props) {
    return {
        isChecked: inject('_wwRadioIsChecked', ref(false)),
        isReadonly: inject('_wwRadioIsReadonly', ref(false)),
        isRequired: inject('_wwRadioIsRequired', ref(false)),
        isDisabled: inject('_wwRadioIsDisabled', ref(false)),
        name: inject(
            '_wwRadioName',
            computed(() => props.content.name)
        ),
        value: inject('_wwRadioItemValue', undefined),
        select: inject('_wwRadioSelect', () => {}),
        clicked: inject('_wwRadioItemClicked', ref(false)),
        resetClicked: inject('_wwRadioItemResetClicked', () => {}),
    };
}
