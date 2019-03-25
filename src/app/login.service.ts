import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { UserData } from './login-response.model';

interface LoginResponse {
  body: string;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  constructor(private httpClient: HttpClient) { }

  userData  = new Subject();
  loggedIn = new Subject();

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  }); 

  options = {
    headers: this.httpHeaders
  }; 

  signupUser(form: FormGroup){

    let signupData = {
      "email": form.value['email'],
      "dateOfBirth": form.value['dateOfBirth'],
      "photo": form.value['photoUrl'],
      "authentication":{
        "username": form.value['username'],
        "password": form.value['pass']
    }};

    return this.httpClient.post("https://applicationfitness.herokuapp.com/user/add", signupData, this.options);

  }

  signinUser(username: string, password: string){

    this.loggedIn.next(false);

    let signinData = {
      "username": username,
      "password": password
    };

    return this.httpClient.post<LoginResponse>("https://applicationfitness.herokuapp.com/auth/signin", signinData, this.options)
      .subscribe(data => {
        this.userData.next(new UserData(data.body, data.token, data.username));
        this.loggedIn.next(true);
      },
      (error) => {
      });

  }
}
