import { exercisesOnOneDay } from "./exercisesOnOneDay.model";

export class TrainingPlan {
  constructor(
    public period: number,
    public trainingPlanName: string,
    public level: string,
    public photo: string,
    public trainingPlanExercises: exercisesOnOneDay[]
  ) {}
}
