import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "../login.service";

@Injectable({
  providedIn: "root"
})
export class UserProfileService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getMeasurements() {
    return this.http.get(
      "https://applicationfitness.herokuapp.com/measurements/last/one/show",
      this.loginService.getHeadersWithToken()
    );
  }

  addMeasurement(measurement: {}) {
    return this.http
      .post(
        "https://applicationfitness.herokuapp.com/measurements/progress/add",
        measurement,
        this.loginService.getHeadersWithToken()
      )
      .subscribe(
        (resp: Response) => {
          console.log(resp);
        },
        (error: Error) => {
          console.log(error);
        }
      );
  }
}
