import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ConfirmPasswordValidator } from './confirm.password.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  emailUsernameErrShow = false;
  formSubmitted = false;

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'pass': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'repPass': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'dateOfBirth': new FormControl('', Validators.required),
      'photoUrl': new FormControl('', Validators.required),
      'rulesCheck': new FormControl(false)
    }, { validator: ConfirmPasswordValidator.MatchPassword}
    )
  }

  onSubmit(){
    this.formSubmitted = true;

    if(this.registerForm.controls['rulesCheck'].value !== false && this.registerForm.valid){

      this.loginService.signupUser(this.registerForm).subscribe(
        (response: Response) => {
          this.router.navigate(['/']);
        },
        (error: Response) => {
          if(error.status === 409){
            this.emailUsernameErrShow = true;
          } else {
            
          }
        }
      );

    } 

   
 
    
      
  }

}