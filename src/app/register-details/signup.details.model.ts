import { BodyMeasurements } from "./body.measurements.model";

export class SignupDetails {
    private build: string;
    private height: string;
    private bodyMeasurements: BodyMeasurements[];

    get _build(){
        return this.build;
    }

    get _height(){
        return this.height;
    }

    get _bodyMeasurements(){
        return this.bodyMeasurements;
    }

    constructor(build: string, height: string, bodyMeasurements: BodyMeasurements[]){
        this.build = build;
        this.height = height;
        this.bodyMeasurements = bodyMeasurements;
    }
}