import { Component, OnInit} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';

interface LoginResponse {
  body: boolean;
  token: string;
  username: string;
  roles: string[];
  photo: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  role = 'ROLE_GUEST';
  userData: LoginResponse;
  userAvatar: string;
  username: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
   
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

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.role === 'ROLE_USER'){
      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.userAvatar = this.userData.photo;
      this.username = this.userData.username;
    }
    
  }

}
