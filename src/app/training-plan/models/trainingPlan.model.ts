import { exercisesOnOneDay } from "./exercisesOnOneDay.model";

export class trainingPlan {
  constructor(
    public period: number,
    public trainingPlanName: string,
    public level: string,
    public photo: string,
    public trainingPlanExercises: exercisesOnOneDay[]
  ) {}
}
