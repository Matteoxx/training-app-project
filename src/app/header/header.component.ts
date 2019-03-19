import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;

  //tutaj bedzie przechowywane czy zalogowany czy nie i na podstawie tego beda sie wyswietlac rozne rzeczy w menu
  loggedIn = false;

  constructor() { }

  ngOnInit() {
  }

}
