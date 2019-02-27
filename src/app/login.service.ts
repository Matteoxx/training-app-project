import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loggedIn = false;

  usersDatabase = [
    {
      'username': 'user1',
      'password': 'password1'
    },
    {
      'username': 'user2',
      'password': 'password2'
    },
    {
      'username': 'user3',
      'password': 'password3'
    }
  ];

  logIn(username: string, password: string) {
    for (const user of this.usersDatabase) {
      if ( (user.username === username) && (user.password === password) ) {
        this.loggedIn = true;
        console.log('loggedin: ', this.loggedIn);
      }
    }
  }

}
