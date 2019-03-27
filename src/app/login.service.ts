import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SignupDetails } from './register-details/signup.details.model';

interface LoginResponse {
  body: boolean;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

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

  signupUserWithDetails(){

    return this.httpClient.post("https://applicationfitness.herokuapp.com/user/body/add", 
    {
      "build": "mazolf",
      "height": "100",
      "bodyMeasurements": [
        {
          "date": "2018-12-10",
          "weight": "100",
          "measurements": [
            {
              "name": "neck",
              "progress": "0",
              "size": "40"
            },
            {
              "name": "shoulder",
              "progress": "0",
              "size": "40"
            }
          ]
        }
      ]
    }
    , this.options)
      .subscribe(
        (resp: Response) => {
          console.log(resp);
        },
        (error: Error) => {
          console.log(error);
        }
      );
    }

  signinUser(username: string, password: string){
    
    let signinData = {
      "username": username,
      "password": password
    };

    return this.httpClient.post<LoginResponse>("https://applicationfitness.herokuapp.com/auth/signin", signinData, this.options)
      .subscribe(data => {
        localStorage.setItem('userData', JSON.stringify(data));
        // this.token = data.token;
        this.loggedIn.next(true);

    
        this.router.navigate(['/details']);
  

        // if(data.body == false){
        //   this.router.navigate(['/details']);
        // } else {
        //   this.router.navigate(['/']);
        // }

      },
      (error) => {
      });

  }
}
