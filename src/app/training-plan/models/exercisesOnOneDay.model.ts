import { Exercise } from "./exercise.model";
import { Cardio } from "./cardio.model";

export class exercisesOnOneDay {
  constructor(
    public dayNr: number,
    public warmupExercises: Exercise[],
    public exercises: Exercise[],
    public cardio: Cardio
  ) {}
}
