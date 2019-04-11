import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpinionsTrainersService } from '../opinions-trainers.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrainerOpinion } from '../trainer.opinion.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-opinions-trainer-details',
  templateUrl: './opinions-trainer-details.component.html',
  styleUrls: ['./opinions-trainer-details.component.css']
})
export class OpinionsTrainerDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  trainerId: number;
  opinions: TrainerOpinion[];
  opinionForm: FormGroup;

  constructor(private opinionsTrainersDietsService: OpinionsTrainersService, 
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.opinionForm = new FormGroup({
      opinion: new FormControl('', Validators.required)
    })

    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.trainerId = +params['id'];
        this.opinionsTrainersDietsService.getTrainerOpinion(this.trainerId).subscribe(
          (resp: TrainerOpinion[]) => {
            this.opinions = resp;
          },
          (error: Error) => {
            console.log(error);
          }
        )
      }
    )
  
  }

  addOpinion(){
    this.opinionsTrainersDietsService.addTrainerOpinion(this.trainerId, this.opinionForm.controls['opinion'].value).subscribe(
      (resp: Response) => {
        console.log(resp);
        this.opinionForm.reset();
      },
      (error: Error) => {
        console.log(error);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  


}
