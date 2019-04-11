import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OpinionsDietService } from './opinions-diet.service';

@Component({
  selector: 'app-opinions-diets',
  templateUrl: './opinions-diets.component.html',
  styleUrls: ['./opinions-diets.component.css']
})
export class OpinionsDietsComponent implements OnInit {

  constructor(private loginService: LoginService, private opinionsDietService: OpinionsDietService) { }

  role: string;

  opinionsDietForm: FormGroup;

  ngOnInit() { 

    this.opinionsDietService.getOpinionsDiets().subscribe(
      (resp: Response) => {
        console.log(resp);
      },
      (error: Error) => {
        console.log(error);
      }
    )

    this.opinionsDietForm = new FormGroup({
      'opinion': new FormControl('')
    })

    this.loginService.role.subscribe(
      (role: string) => {
        this.role = role;
      }
    );

  }

  addOpinion(){
    const opinion = this.opinionsDietForm.controls['opinion'].value;
    this.opinionsDietService.addOpinionDiet(opinion).subscribe(
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
