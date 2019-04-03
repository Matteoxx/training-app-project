import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  body: boolean;
  token: string;
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  loggedIn = new Subject();
  role  = new Subject();

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

    return this.httpClient.post('https://applicationfitness.herokuapp.com/user/add', signupData, this.options);

  }

  signupUserWithDetails(signupDetails){

    let userData: LoginResponse = JSON.parse(localStorage.getItem('userData'));
    let token = userData.token;

    let httpHeadersWithToken = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' +  token
    }); 
  
    let options = {
      headers: httpHeadersWithToken
    }; 

    return this.httpClient.post('https://applicationfitness.herokuapp.com/user/body/add', signupDetails, options)
      .subscribe(
        (resp: Response) => {
          this.router.navigate(['/']);
        },
        (error: Error) => {
          
        }
      );
    }

  signinUser(username: string, password: string){
    
    let signinData = {
      "username": username,
      "password": password
    };

    return this.httpClient.post<LoginResponse>('https://applicationfitness.herokuapp.com/auth/signin', signinData, this.options)
      .subscribe(data => {
        
        localStorage.setItem('userData', JSON.stringify(data));
        this.loggedIn.next(true);

        if(data.roles.includes('ROLE_EMPLOYEE')) {
          this.router.navigate(['/employee']);
          this.role.next('ROLE_EMPLOYEE');
        } else if(data.roles.includes('ROLE_USER')){
          if(data.body == false ){
            this.router.navigate(['/details']);
          } else {
            this.router.navigate(['/']);
          }
          this.role.next('ROLE_USER');
        }

      },
      (error) => {
      });

  }

  getSportArticles(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/news/show', this.options);
  }

}
