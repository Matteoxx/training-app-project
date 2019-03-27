import { Measurements } from "./measurements.model";

export class BodyMeasurements {
    private date: string;
    private weight: string;
    private measurements: Measurements;

    get _date(){
        return this.date;
    }

    get _weight(){
        return this.weight;
    }

    get _measurements(){
        return this.measurements;
    }

    constructor(date: string, weight: string, measurements: Measurements){
        this.date = date;
        this.weight = weight;
        this.measurements = measurements;
    }

}