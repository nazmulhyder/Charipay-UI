import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


    // start date should not be greater than start date
    export function endDateAfterStartDateValidator(): ValidatorFn {
        return (formGrp : AbstractControl) : ValidationErrors | null => {
            const start = formGrp.get('')?.value;
            const end = formGrp.get('')?.value;

            // null check

            if(!start || !end) return null;

            // convert to date for comparison

            const startDate = new Date(start);
            const endDate = new Date(end);

            return endDate < startDate? {endBeforeStart : true} : null;
        }
    }  
