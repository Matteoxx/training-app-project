import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  
  loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loggedIn.subscribe(
      (loggedInStatus: boolean) => {
        this.loggedIn = loggedInStatus;
      }
    );
  }

  onLogout(){
    this.loginService.loggedIn.next(false);
  }

}
