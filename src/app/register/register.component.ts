import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'repeatEmail': new FormControl('', Validators.required),
      'pass': new FormControl('', Validators.required),
      'repPass': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', Validators.required),
      'photoUrl': new FormControl('', Validators.required),
      'rulesCheck': new FormControl(false, Validators.required)
    })
  }

  onSubmit(){

    const email = this.registerForm.value['email'];
    const dateOfBirth = this.registerForm.value['date'];
    const username = this.registerForm.value['username'];
    const password = this.registerForm.value['password'];
    const photoUrl = this.registerForm.value['photoUrl'];
      
    this.loginService.signupUser( email, dateOfBirth, username, password, photoUrl).subscribe();
  }

}
