import { Component, OnInit} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';
import { LoginResponse } from '../login.response.interface';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
   
    this.loginService.role.subscribe(
      (role: string) => {
        this.role = role;
      }
    );

  }

  onLogout(){
    this.loginService.role.next('ROLE_GUEST');
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.role === 'ROLE_USER'){
      this.userData = this.loginService.getLoggedUserData();
      this.userAvatar = this.userData.photo;
      this.username = this.userData.username;
    }
    
  }

}
