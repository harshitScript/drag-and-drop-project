namespace App {
    // VALIDATION
    export interface Validatable {
        value: string | number;
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        max?: number;
        min?: number;
    }

    export function validate(validatableInput: Validatable) {
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

}