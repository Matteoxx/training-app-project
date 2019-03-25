import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    this.loginService.signinUser(username, password);
  }

}
