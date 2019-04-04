import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ConfirmPasswordValidator } from './confirm.password.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  emailUsernameErrShow = false;
  formSubmitted = false;

  registerForm: FormGroup;
  isLinear = false;

  photoUrl = ''; 

  

  singleFileUploadInput = document.querySelector<HTMLInputElement>('#singleFileUploadInput');
  singleFileUploadError = document.querySelector<HTMLDivElement>('#singleFileUploadError');
  singleFileUploadSuccess = document.querySelector<HTMLDivElement>('#singleFileUploadSuccess');

  ngOnInit() {
    this.registerForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'pass': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'repPass': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'dateOfBirth': new FormControl('', Validators.required),
      'rulesCheck': new FormControl(false)
    }, { validator: ConfirmPasswordValidator.MatchPassword}
    )
  }

  onSubmit(){
    this.formSubmitted = true;

    if(this.registerForm.controls['rulesCheck'].value !== false && this.registerForm.valid){

      this.loginService.signupUser(this.registerForm, this.photoUrl).subscribe(
        (response: Response) => {
          this.router.navigate(['/']);
        },
        (error: Response) => {
          if(error.status === 409){
            this.emailUsernameErrShow = true;
          } 
        }
      );

    } 

  }

  uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    let _this = this;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://applicationfitness.herokuapp.com/uploadPhoto");

    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
          _this.photoUrl = response.photoUrl;
          document.querySelector<HTMLImageElement>('#photoImg').src = response.photoUrl;
        } else {
          console.log("błąd dodawania avatara");
        }
    }

    xhr.send(formData);
}

  upload(event: Event){
  var files = document.querySelector<HTMLInputElement>('#singleFileUploadInput').files;
  if(files.length === 0) {
    document.querySelector<HTMLDivElement>('#singleFileUploadError').innerHTML = "Please select a file";
    document.querySelector<HTMLDivElement>('#singleFileUploadError').style.display = "block";
  }
    this.uploadSingleFile(files[0]);
    event.preventDefault();
  }

}