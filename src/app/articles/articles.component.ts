import { Component, OnInit } from '@angular/core';
import { Articles } from './articles.model';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  
  sportArticles: Articles;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getSportArticles().subscribe(
        (resp: Articles) => {
          this.sportArticles = resp;
        },
        (error: Error) => {
        }
      );
  }
}
