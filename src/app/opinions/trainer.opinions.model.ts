import { TrainerOpinion } from "./trainer.opinion.model";

export class TrainerOpinions {

    constructor(public trainerId: number, public firstName: string,
                public lastName: string, public speciality: string,
                public photo: string, public opinions: TrainerOpinion[]
                ){}
}