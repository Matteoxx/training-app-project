import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getSportArticles(){
    return this.httpClient.get('https://applicationfitness.herokuapp.com/news/show', this.loginService.getHeaders());
  }
}
