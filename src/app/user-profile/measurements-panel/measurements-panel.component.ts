import { Component, OnInit } from "@angular/core";
import { UserProfileService } from "../user-profile.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Measurement } from "src/app/register-details/measurement.model";

@Component({
  selector: "app-measurements-panel",
  templateUrl: "./measurements-panel.component.html",
  styleUrls: ["./measurements-panel.component.css"]
})
export class MeasurementsPanelComponent implements OnInit {
  constructor(private userProfileService: UserProfileService) {}

  measurements: any = [];
  formSubmitted = false;

  addMeasurementForm: FormGroup;

  ngOnInit() {
    this.userProfileService.getMeasurements().subscribe(
      (data: {}) => {
        console.log(data);
        this.measurements = data;
      },
      (err: Error) => {
        console.log(err);
      }
    );

    this.addMeasurementForm = new FormGroup({
      basic: new FormGroup({
        build: new FormControl("ektomorfik", Validators.required),
        weight: new FormControl("", Validators.required),
        height: new FormControl("", Validators.required)
      }),
      extended: new FormGroup({
        neck: new FormControl("", Validators.required),
        shoulder: new FormControl("", Validators.required),
        waist: new FormControl("", Validators.required),
        hips: new FormControl("", Validators.required),
        thigh: new FormControl("", Validators.required),
        chest: new FormControl("", Validators.required),
        forearm: new FormControl("", Validators.required),
        calf: new FormControl("", Validators.required),
        ankle: new FormControl("", Validators.required)
      })
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.addMeasurementForm.valid) {
      let measurements = {
        date: this.getCurrentDay(),
        measurements: [
          new Measurement(
            "weight",
            "0",
            this.addMeasurementForm.controls.basic.value.weight
          ),
          new Measurement(
            "neck",
            "0",
            this.addMeasurementForm.controls.extended.value.neck
          ),
          new Measurement(
            "shoulder",
            "0",
            this.addMeasurementForm.controls.extended.value.shoulder
          ),
          new Measurement(
            "waist",
            "0",
            this.addMeasurementForm.controls.extended.value.waist
          ),
          new Measurement(
            "hips",
            "0",
            this.addMeasurementForm.controls.extended.value.hips
          ),
          new Measurement(
            "thigh",
            "0",
            this.addMeasurementForm.controls.extended.value.neck
          ),
          new Measurement(
            "chest",
            "0",
            this.addMeasurementForm.controls.extended.value.chest
          ),
          new Measurement(
            "forearm",
            "0",
            this.addMeasurementForm.controls.extended.value.forearm
          ),
          new Measurement(
            "calf",
            "0",
            this.addMeasurementForm.controls.extended.value.calf
          ),
          new Measurement(
            "ankle",
            "0",
            this.addMeasurementForm.controls.extended.value.ankle
          )
        ]
      };

      console.log(measurements);
      this.userProfileService.addMeasurement(measurements);
    }
  }

  getCurrentDay() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let currentDate: string = yyyy + "-" + mm + "-" + dd;
    return currentDate;
  }
}
