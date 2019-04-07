import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from './login.response.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  role  = new Subject();

  getHeaders(){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    }); 
  
    let options = {
      headers: httpHeaders
    }; 

    return options;
  }

  getHeadersWithToken(){

    let userData = this.getLoggedUserData();
    let token = userData.token;

    let httpHeadersWithToken = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' +  token
    }); 
  
    let options = {
      headers: httpHeadersWithToken
    }; 

    return options;
  }

  signupUser(form: FormGroup, photoUrl: string){

    let signupData = {
      'gender': form.value['gender'],
      'firstName': form.value['firstName'],
      'lastName': form.value['lastName'],
      "email": form.value['email'],
      "dateOfBirth": form.value['dateOfBirth'],
      "photo": photoUrl,
      "authentication":{
        "username": form.value['username'],
        "password": form.value['pass']
    }};

    return this.httpClient.post('https://applicationfitness.herokuapp.com/user/add', signupData, this.getHeaders());

  }

  signupUserWithDetails(signupDetails){

    return this.httpClient.post('https://applicationfitness.herokuapp.com/user/body/add', signupDetails, this.getHeadersWithToken())
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

    return this.httpClient.post<LoginResponse>('https://applicationfitness.herokuapp.com/auth/signin', signinData, this.getHeaders())
      .subscribe(data => {
        
        localStorage.setItem('userData', JSON.stringify(data));

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

  getLoggedUserData(){
    let userData: LoginResponse;
    userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
  }

  getSportArticles(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/news/show', this.getHeaders());
  }

}
