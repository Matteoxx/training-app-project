import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';

@Injectable({
  providedIn: 'root'
})
export class OpinionsDietService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  addOpinionDiet(opinion: string){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    let currentDate: string = yyyy + '-' + mm + '-' + dd;

    let opinionDiet = {
      'date': currentDate,
      'message': opinion
    };

    return this.httpClient.post('https://applicationfitness.herokuapp.com/opinion/diet/send', 
                              opinionDiet, this.loginService.getHeadersWithToken());
  }

  getOpinionsDiets(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/opinion/diet/show', 
                              this.loginService.getHeaders());
  }
}
