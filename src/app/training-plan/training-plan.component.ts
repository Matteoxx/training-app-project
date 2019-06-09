import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Exercise } from "./models/exercise.model";
import { Cardio } from "./models/cardio.model";

@Component({
  selector: "app-training-plan",
  templateUrl: "./training-plan.component.html",
  styleUrls: ["./training-plan.component.css"]
})
export class TrainingPlanComponent implements OnInit {
  constructor() {}

  trainingDays = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

  exerciseNames = ["pompki", "pszysiady", "potciaganie"];
  exercises: Exercise[] = [];
  warmupExerciseNames = ["pajacyki", "pompki"];
  warmupExercises: Exercise[] = [];
  cardioExerciseNames = ["bieganie", "rowerek"];
  cardioExercises: Cardio[] = [];

  trainingPlanForm: FormGroup;

  ngOnInit() {
    this.trainingPlanForm = new FormGroup({
      period: new FormControl(7),
      trainingPlanName: new FormControl(""),
      level: new FormControl(""),
      photo: new FormControl("")
    });
  }

  addExercise() {
    this.exercises.push(
      new Exercise("pompki", "10-12", "3-4", "http://costam.pl")
    );
  }

  addWarmup() {
    this.warmupExercises.push(
      new Exercise("pajacyki", "25-30", "2-3", "http://costam.pl")
    );
  }

  addCardio(e) {
    e.target.hidden = true;
    this.cardioExercises.push(new Cardio("Rowerek stacjonarny", "15 minut"));
  }

  deleteWarmupExercise(index: number) {
    this.warmupExercises.splice(index, 1);
  }
  deleteTrainingExercise(index: number) {
    this.exercises.splice(index, 1);
  }
  deleteCardioExercise(index: number) {
    this.cardioExercises.splice(index, 1);
    // Zrobic zeby button znowu sie pokazal
  }
}
