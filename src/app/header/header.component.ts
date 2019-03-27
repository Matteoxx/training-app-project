import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedSubscription: Subscription;

  faUser = faUser;
  
  loggedIn = false;


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedSubscription = this.loginService.loggedIn.subscribe(
      (loggedInStatus: boolean) => {
        this.loggedIn = loggedInStatus;
      }
    );
  }

  onLogout(){
    this.loginService.loggedIn.next(false);
    localStorage.removeItem('userData');
  }

  ngOnDestroy(){
    this.loggedSubscription.unsubscribe();
  }

}
