import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loggedIn = false;


  signupUser(email: string, dateOfBirth: string, username: string, password: string, photoUrl: string){

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    }); 

    let options = {
      headers: httpHeaders
    }; 

    console.log(email);

    return this.httpClient.post("https://fitnessgoals.herokuapp.com/user/add", {
      
        "email": email,
        "dateOfBirth": dateOfBirth,
        "photo":"https://i1.memy.pl/obrazki/78bb383940_krzysiek.jpg",
        "authentication":{
          "username":"mato21",
          "password":"password"
        }
    }, options);

        
    

  }
}
