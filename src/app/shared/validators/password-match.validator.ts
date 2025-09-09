import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordField)?.value;
    const confirmPassword = form.get(confirmPasswordField)?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };  // set error at FormGroup level
    }
    return null; // no error
  };
}