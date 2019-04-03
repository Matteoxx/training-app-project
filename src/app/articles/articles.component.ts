import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Articles } from './articles.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  
  sportArticles: Articles;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getSportArticles()
      .subscribe(
        (resp: Articles) => {
          this.sportArticles = resp;
        },
        (error: Error) => {
        }
      );
  }
}
