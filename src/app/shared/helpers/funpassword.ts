import { AbstractControl } from "@angular/forms";

export const validaterepassword=(control: AbstractControl)=> {
    let pass = control.get('password')?.value;
    let repass = control.get('rePassword')?.value;
    return pass === repass ? null : { mismatch: true }
  }