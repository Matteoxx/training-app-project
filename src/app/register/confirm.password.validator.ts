import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
       let password = control.get('pass').value;

       let confirmPassword = control.get('repPass').value;

        if(password != confirmPassword) {
            control.get('repPass').setErrors( {ConfirmPassword: true} );
        } else {
            return null
        }
    }
}