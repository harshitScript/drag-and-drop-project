export function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.maxLength != null) {
        isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength;
    }
    if (validatableInput.minLength != null) {
        isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength;
    }
    if (validatableInput.max != null) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value <= validatableInput.max;
    }
    if (validatableInput.min != null) {
        isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value >= validatableInput.min;
    }
    return isValid;
}
