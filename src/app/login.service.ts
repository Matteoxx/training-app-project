import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loggedIn = false;

  signupUser(form: FormGroup){

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    }); 

    let options = {
      headers: httpHeaders
    }; 

    let signupData = {
      "email": form.value['email'],
      "dateOfBirth": form.value['dateOfBirth'],
      "photo": form.value['photoUrl'],
      "authentication":{
        "username": form.value['username'],
        "password": form.value['pass']
    }};

    return this.httpClient.post("https://applicationfitness.herokuapp.com/user/add", signupData, options);

  }
}
