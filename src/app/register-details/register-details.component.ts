import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Measurement } from './measurement.model';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.css']
})
export class RegisterDetailsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  formSubmitted = false;

  registerDetailsForm: FormGroup;

  ngOnInit() {
    this.registerDetailsForm = new FormGroup({
      basic: new FormGroup({
        'build': new FormControl('ektomorfik', Validators.required),
        'weight': new FormControl('', Validators.required),
        'height': new FormControl('', Validators.required)
      }),
      extended: new FormGroup({
        'neck': new FormControl('', Validators.required),
        'shoulder': new FormControl('', Validators.required),
        'waist': new FormControl('', Validators.required),
        'hips': new FormControl('', Validators.required),
        'thigh': new FormControl('', Validators.required),
        'chest': new FormControl('', Validators.required),
        'forearm': new FormControl('', Validators.required),
        'calf': new FormControl('', Validators.required),
        'ankle': new FormControl('', Validators.required)
      })
    })
  }

  onSubmit(){

    this.formSubmitted = true;

    if(this.registerDetailsForm.valid){
      
      let signupDetails = {
        'build': this.registerDetailsForm.controls.basic.value.build,
        'height': this.registerDetailsForm.controls.basic.value.height,
        'bodyMeasurements': [
          {
            'date': this.getCurrentDay(),
            'weight': this.registerDetailsForm.controls.basic.value.weight,
            'measurements': [
              new Measurement('neck', '0', this.registerDetailsForm.controls.extended.value.neck),
              new Measurement('shoulder', '0', this.registerDetailsForm.controls.extended.value.shoulder),
              new Measurement('waist', '0', this.registerDetailsForm.controls.extended.value.waist),
              new Measurement('hips', '0', this.registerDetailsForm.controls.extended.value.hips),
              new Measurement('thigh', '0', this.registerDetailsForm.controls.extended.value.neck),
              new Measurement('chest', '0', this.registerDetailsForm.controls.extended.value.chest),
              new Measurement('forearm', '0', this.registerDetailsForm.controls.extended.value.forearm),
              new Measurement('calf', '0', this.registerDetailsForm.controls.extended.value.calf),
              new Measurement('ankle', '0', this.registerDetailsForm.controls.extended.value.ankle)
            ]
          }
        ]
      }

      this.loginService.signupUserWithDetails(signupDetails);
    }

  
  }

  getCurrentDay(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    let currentDate: string = yyyy + '-' + mm + '-' + dd;
    return currentDate;
  }

}
