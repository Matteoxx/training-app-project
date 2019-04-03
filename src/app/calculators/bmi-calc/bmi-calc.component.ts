import {Component} from '@angular/core';

@Component({
  selector: 'app-bmi-calc',
  templateUrl: './bmi-calc.component.html',
  styleUrls: ['./bmi-calc.component.css']
})
export class BmiCalcComponent {

  public height: number;
  public weight: number;
  public bmi;
  public result: string;

  calc_bmi() {
    const height2 = this.height * this.height;
    this.bmi = (this.weight / (height2) * 10000).toFixed(2);
    if (this.bmi < 16) {
      this.result = 'wychudzenie';
    }
    if (this.bmi <= 16.99 && this.bmi >= 16) {
      this.result = 'wychudzenie';
    }
    if (this.bmi <= 18.49 && this.bmi >= 17) {
      this.result = 'niedowaga';
    }
    if (this.bmi <= 24.49 && this.bmi >= 18.5) {
      this.result = 'wartość prawidłowa';
    }
    if (this.bmi <= 29.99 && this.bmi >= 25) {
      this.result = 'nadwaga';
    }
    if (this.bmi <= 34.99 && this.bmi >= 30) {
      this.result = 'I stopień otyłości';
    }
    if (this.bmi <= 39.99 && this.bmi >= 35) {
      this.result = 'II stopień otyłości';
    }
    if (this.bmi >= 40) {
      this.result = 'III stopień otyłości (otyłość skrajna)';
    }
  }
}
