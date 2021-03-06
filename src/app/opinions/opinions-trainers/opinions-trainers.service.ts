import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OpinionsTrainersService {

  constructor(private loginService: LoginService, private httpClient: HttpClient) { }

  addTrainerOpinion(trainerId: number, message: string){

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    let currentDate: string = yyyy + '-' + mm + '-' + dd;

    let opinion =  {
      'trainerId' : trainerId,
      'date': currentDate,
      'message': message
    };
    return this.httpClient.post('https://applicationfitness.herokuapp.com/opinion/trainer/send', 
                          opinion, 
                          this.loginService.getHeadersWithToken()
                        );
  }

  getTrainerOpinion(id: number){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/opinion/' + id, 
                        this.loginService.getHeaders()
                        );
  }

  getTrainersInfo(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/employee/trainer/show', 
                      this.loginService.getHeaders());
  }

}
