import { Measurement } from "./measurement.model";

export class Measurements {

    private measurement: Measurement[];

    get _measurement(){
        return this.measurement;
    }

    constructor(measurement: Measurement[]){
        this.measurement = measurement;
    }
}