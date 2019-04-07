import { Component, OnInit } from '@angular/core';
import { OpinionsService } from './opinions.service';
import { TrainerOpinions } from './trainer.opinions.model';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {

  opinions: TrainerOpinions;

  constructor(private opinionsService: OpinionsService) { }

  ngOnInit() {
    this.opinionsService.getTrainerOpinion(1).subscribe(
      (resp: TrainerOpinions) => {
        this.opinions = resp;
      },
      (error: Error) => {
      }
    );
  }

}
