import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { SignupDetails } from './signup.details.model';
import { BodyMeasurements } from './body.measurements.model';
import { Measurements } from './measurements.model';
import { Measurement } from './measurement.model';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.css']
})
export class RegisterDetailsComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  registerDetailsForm: FormGroup;

  ngOnInit() {
    this.registerDetailsForm = new FormGroup({
      basic: new FormGroup({
        'weight': new FormControl(''),
        'height': new FormControl('')
      }),
      extended: new FormGroup({
        'neck': new FormControl(''),
        'shoulder': new FormControl(''),
        'waist': new FormControl(''),
        'hips': new FormControl(''),
        'thigh': new FormControl(''),
        'chest': new FormControl(''),
        'forearm': new FormControl(''),
        'calf': new FormControl(''),
        'ankle': new FormControl('')
      })
    })
  }

  onSubmit(){
    let build = 'najlepsza budowa';
    let currentData = '2018-02-02';
    let measurementArray = [
      
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

      let signupDetails = {
        'build': 'mazolf',
        'height': 100,
        'bodyMeasurements': [
          {
            'date': '2018-12-10',
            'weight': '100',
            'measurements': [
              {
                'name': 'neck',
                'progress': 0,
                'size': 40
              },
              {
                'name': 'shoulder',
                'progress': 0,
                'size': 40
              }
            ]
          }
        ]
      }
    // let signupDetails = new SignupDetails(
    //   build, 
    //   this.registerDetailsForm.controls.basic.value.height, [
    //   new BodyMeasurements(
    //     currentData, 
    //     this.registerDetailsForm.controls.basic.value.weight,
        
      // build, 
      // this.registerDetailsForm.controls.basic.value.height, [
      // new BodyMeasurements(
      //   currentData, 
      //   this.registerDetailsForm.controls.basic.value.weight,
      //   null
        // new Measurements(measurementArray)
      // )]
    // );

    this.loginService.signupUserWithDetails();
  }

}
