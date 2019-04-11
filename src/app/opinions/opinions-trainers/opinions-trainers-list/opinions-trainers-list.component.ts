import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpinionsTrainersService } from '../opinions-trainers.service';
import { TrainersInfo } from '../trainers-info-model';

@Component({
  selector: 'app-opinions-trainers-list',
  templateUrl: './opinions-trainers-list.component.html',
  styleUrls: ['./opinions-trainers-list.component.css']
})
export class OpinionsTrainersListComponent implements OnInit {

  trainersInfo: TrainersInfo[];

  constructor(private router: Router, private opinionsTrainersService: OpinionsTrainersService) { }

  ngOnInit() {
    this.opinionsTrainersService.getTrainersInfo().subscribe(
      (resp: TrainersInfo[]) => {
        console.log(resp);
        this.trainersInfo = resp;
      },
      (error: Error) => {
        console.log(error);
      }
    )
  }

  showTrainerDetails(trainerId: number){
    this.router.navigate(['/opinions/trainers/' + trainerId]);
  }

}
