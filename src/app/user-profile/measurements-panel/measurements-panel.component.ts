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

  formSubmitted = false;
  data = {};

  addMeasurementForm: FormGroup;

  showAddMeasurements = false;

  ngOnInit() {
    this.userProfileService.getMeasurements().subscribe(
      (data: {}) => {
        this.data = data;
        console.log(this.data);
      },
      (err: Error) => {
        console.log(err);
      }
    );

    this.addMeasurementForm = new FormGroup({
      weight: new FormControl("", Validators.required),
      neck: new FormControl("", Validators.required),
      shoulder: new FormControl("", Validators.required),
      waist: new FormControl("", Validators.required),
      hips: new FormControl("", Validators.required),
      thigh: new FormControl("", Validators.required),
      chest: new FormControl("", Validators.required),
      forearm: new FormControl("", Validators.required),
      calf: new FormControl("", Validators.required),
      ankle: new FormControl("", Validators.required)
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
            this.addMeasurementForm.controls.weight.value
          ),
          new Measurement(
            "neck",
            "0",
            this.addMeasurementForm.controls.neck.value
          ),
          new Measurement(
            "shoulder",
            "0",
            this.addMeasurementForm.controls.shoulder.value
          ),
          new Measurement(
            "waist",
            "0",
            this.addMeasurementForm.controls.waist.value
          ),
          new Measurement(
            "hips",
            "0",
            this.addMeasurementForm.controls.hips.value
          ),
          new Measurement(
            "thigh",
            "0",
            this.addMeasurementForm.controls.neck.value
          ),
          new Measurement(
            "chest",
            "0",
            this.addMeasurementForm.controls.chest.value
          ),
          new Measurement(
            "forearm",
            "0",
            this.addMeasurementForm.controls.forearm.value
          ),
          new Measurement(
            "calf",
            "0",
            this.addMeasurementForm.controls.calf.value
          ),
          new Measurement(
            "ankle",
            "0",
            this.addMeasurementForm.controls.ankle.value
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
