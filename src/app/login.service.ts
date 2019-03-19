import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loggedIn = false;

  signupUser(form: FormGroup){
    console.log(form.value);
    return this.httpClient.post('https://fitnessgoals.herokuapp.com/user/add', {
      "email": form.value.email,
      "dateOfBirth": form.value.dateOfBirth,
      "photo": "https://www.e-picfun.pl/upload/images/large/2018/03/bedziesz_cos_chcial_2018-03-11_15-05-59.jpg",
      "authentication": {
        "username": form.value.username,
        "password": form.value.password
      }
    });

  }


 
 
  

}
