import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getChatMessageFromDb(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/chat/show', this.loginService.getHeadersWithToken());
  }

  
}
