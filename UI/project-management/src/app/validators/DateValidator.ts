import { FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { Validators } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";
import { ValidationErrors, AsyncValidatorFn } from "@angular/forms/src/directives/validators";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { promise } from "selenium-webdriver";

export function IsValidDate(): AsyncValidatorFn   {
    return (control: AbstractControl): Promise<ValidationErrors |null|Observable<ValidationErrors|null>> => {

        const invalidOj = { "IsValidDate": true };


        const stardDate = Date.parse(control.value);
        if (stardDate === undefined || stardDate === null) {

            return Promise.resolve(invalidOj);
        }
        return Promise.resolve(null);
    }
}
 

export function  DateMustbeGreaterThanValidation (startDateFormControlname: string, endDateFormControlname: string): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {

        const invalidOj = { "DateRange": true };
        const startDateFormControl = control.get(startDateFormControlname);
        const endDateFormControl = control.get(endDateFormControlname);
        if (startDateFormControl.valid && endDateFormControl.valid) {
            const stardDate = Date.parse(startDateFormControl.value);
            const endDate = Date.parse(endDateFormControl.value);
            if (stardDate > endDate) {
                control.setErrors({'DateRange':true});
                return invalidOj;
            }
            return null;
        }
        return null;

    }
}