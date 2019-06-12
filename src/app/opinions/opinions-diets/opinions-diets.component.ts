import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login.service";
import { FormGroup, FormControl } from "@angular/forms";
import { OpinionsDietService } from "./opinions-diet.service";

@Component({
  selector: "app-opinions-diets",
  templateUrl: "./opinions-diets.component.html",
  styleUrls: ["./opinions-diets.component.css"]
})
export class OpinionsDietsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private opinionsDietService: OpinionsDietService
  ) {}

  role: string;

  opinionsDietForm: FormGroup;

  showAddOpinion = false;

  opinions = [];

  ngOnInit() {
    let userdata = this.loginService.getLoggedUserData();
    if (userdata && userdata.roles.includes("ROLE_USER")) {
      this.showAddOpinion = true;
    }

    this.opinionsDietService.getOpinionsDiets().subscribe(
      (resp: []) => {
        console.log(resp);
        this.opinions = resp;
      },
      (error: Error) => {
        console.log(error);
      }
    );

    this.opinionsDietForm = new FormGroup({
      opinion: new FormControl("")
    });

    this.loginService.role.subscribe((role: string) => {
      this.role = role;
    });
  }

  addOpinion() {
    const opinion = this.opinionsDietForm.controls["opinion"].value;
    this.opinionsDietService
      .addOpinionDiet(opinion)
      .subscribe((error: Error) => {
        console.log(error);
      });
  }
}
