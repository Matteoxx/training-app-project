import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";

@Component({
  selector: "app-userdata-panel",
  templateUrl: "./userdata-panel.component.html",
  styleUrls: ["./userdata-panel.component.css"]
})
export class UserdataPanelComponent {
  constructor(private loginService: LoginService) {}

  userdata: any = {};
  username: string;

  ngOnInit() {
    this.loginService.getLoggedUserInfo().subscribe(
      (data: {}) => {
        this.userdata = data;
      },
      (err: Error) => {
        console.log(err);
      }
    );

    let userInfoFromLs = this.loginService.getLoggedUserData();
    this.username = userInfoFromLs.username;
  }
}
