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

  role = 'ROLE_GUEST';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedSubscription = this.loginService.loggedIn.subscribe(
      (loggedInStatus: boolean) => {
        this.loggedIn = loggedInStatus;
      }
    );

    this.loginService.role.subscribe(
      (role: string) => {
        this.role = role;
      }
    );
  }

  onLogout(){
    this.loginService.loggedIn.next(false);
    this.loginService.role.next('ROLE_GUEST');
    localStorage.removeItem('userData');
  }

  ngOnDestroy(){
    this.loggedSubscription.unsubscribe();
  }

}
