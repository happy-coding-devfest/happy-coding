import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        const emailRegex = /^[a-zA-Z0-9.+*?_-]+@[a-zA-Z0-9-]{2,7}\.[a-zA-Z0-9]{2,4}$/;
        if(!ctrl.value?.match(emailRegex)) return {
            emailvalidator: ctrl.value
        }
        return null;
    }
}
