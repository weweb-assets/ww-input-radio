import { ref, inject, computed, watch } from 'vue';

export default function useWewebRadio(props, emit) {
    // Try to get the radio group context
    const useRadioChild = inject('_wwRadioGroup:useRadioChild', null);
    
    // Fallback values for standalone radio
    const standaloneChecked = ref(false);
    const standaloneName = computed(() => props.content.name || `radio-${props.wwElementState.uid}`);
    
    // Get value from props
    const radioValue = computed(() => props.content.value);
    
    // Register with radio group if available
    let radioGroupContext = null;
    if (useRadioChild) {
        radioGroupContext = useRadioChild(props.wwElementState.uid, radioValue);
    }
    
    // Determine if we're inside a radio group
    const insideRadioGroup = !!radioGroupContext;
    
    // Get values from context or use standalone defaults
    const isChecked = computed(() => {
        if (radioGroupContext) {
            return radioGroupContext.isSelected?.value || false;
        }
        return standaloneChecked.value;
    });
    
    const name = computed(() => {
        if (radioGroupContext) {
            return radioGroupContext.name?.value || standaloneName.value;
        }
        return standaloneName.value;
    });
    
    const isReadonly = computed(() => {
        // Local readonly takes precedence
        if (props.content.readonly) return true;
        // Then check radio group readonly
        if (radioGroupContext) {
            return radioGroupContext.isReadonly?.value || false;
        }
        return false;
    });
    
    const isRequired = computed(() => {
        if (radioGroupContext) {
            return radioGroupContext.isRequired?.value || false;
        }
        return false;
    });
    
    const select = () => {
        console.log('[Radio useWewebRadio] select() called');
        console.log('[Radio useWewebRadio] isReadonly:', isReadonly.value);
        console.log('[Radio useWewebRadio] radioGroupContext exists:', !!radioGroupContext);
        
        if (isReadonly.value) {
            console.log('[Radio useWewebRadio] Skipping select - radio is readonly');
            return;
        }
        
        if (radioGroupContext && radioGroupContext.select) {
            console.log('[Radio useWewebRadio] Calling radioGroupContext.select()');
            radioGroupContext.select();
        } else {
            console.log('[Radio useWewebRadio] Standalone mode - setting checked to true');
            // Standalone behavior
            standaloneChecked.value = true;
        }
    };
    
    /* wwEditor:start */
    // Update sidepanel content with radio state
    watch(
        [insideRadioGroup, name],
        () => {
            emit('update:sidepanel-content', {
                path: 'radioState',
                value: {
                    insideRadioGroup,
                    groupName: insideRadioGroup ? name.value : null,
                },
            });
        },
        { immediate: true }
    );
    /* wwEditor:end */
    
    return {
        isChecked,
        name,
        value: radioValue,
        select,
        isRequired,
        isReadonly,
        isDisabled: isReadonly, // For backward compatibility
        insideRadioGroup,
    };
}