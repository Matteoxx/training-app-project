import { Exercise } from "./exercise.model";

export class exercisesOnOneDay {
  constructor(
    public warmupName: string,
    public warmupTime: number,
    public cardioName: string,
    public cardioTime: number,
    public exercises: Exercise[]
  ) {}
}
