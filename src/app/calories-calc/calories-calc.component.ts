import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calories-calc',
  templateUrl: './calories-calc.component.html',
  styleUrls: ['./calories-calc.component.css']
})
export class CaloriesCalcComponent {

  genders;
  genSelected: number;
  activities;
  activitySelected: number;
  goals;
  goalsSelected: number;

  constructor() {
    this.genders = [
      {Id: 1, name: 'Mężczyzna'},
      {Id: 2, name: 'Kobieta'},
    ];


    this.activities = [
      {Id: 1, name: 'brak aktywności, praca siedząca'},
      {Id: 2, name: 'niska aktywność (praca siedząca i 1-2 treningi w tygodniu)'},
      {Id: 3, name: 'średnia aktywność (praca siedząca i treningi 3-4 razy w tygodniu)'},
      {Id: 4, name: 'wysoka aktywność (praca fizyczna i 3-4 treningi w tygodniu)'},
      {Id: 5, name: 'bardzo wysoka aktywność (zawodowi sportowcy, osoby codziennie trenujące)'},
    ];

    this.goals = [
      {Id: 1, name: 'dieta redukcyjna'},
      {Id: 2, name: 'dieta mięśniowa'}
    ];
  }


  public height: number;
  public weight: number;
  public age: number;
  public result;
  public MaintenanceCalories;
  public TrainingGoal;


  calc_calories() {
    const wei = 9.99 * this.weight;
    const hei = 6.25 * this.height;
    const ag = 4.92 * this.age;

    if (this.genSelected === 1) {
      this.result = ((wei + hei - ag) + 5).toFixed(2);
      this.calcCPM();
      this.checkGoals();
    }

    if (this.genSelected === 2) {
      this.result = ((wei + hei - ag) - 161).toFixed(2);
      this.calcCPM();
      this.checkGoals();
    }
  }

  calcCPM() {
    const val4 = this.activitySelected;
    if (val4 === 1) {
      this.MaintenanceCalories = (this.result * 1.2).toFixed(2);
    }
    if (val4 === 2) {
      this.MaintenanceCalories = (this.result * 1.35).toFixed(2);
    }
    if (val4 === 3) {
      this.MaintenanceCalories = (this.result * 1.55).toFixed(2);
    }
    if (val4 === 4) {
      this.MaintenanceCalories = (this.result * 1.75).toFixed(2);
    }
    if (val4 === 5) {
      this.MaintenanceCalories = (this.result * 2.05).toFixed(2);
    }
  }

  checkGoals() {
    if (this.goalsSelected === 1) {
      this.TrainingGoal = parseFloat(this.MaintenanceCalories) - 250;
    }
    if (this.goalsSelected === 2) {
      this.TrainingGoal = parseFloat(this.MaintenanceCalories) + 250;
    }
  }
}

//Źródło jakby komu nie pasowało :D
//https://wformie24.poradnikzdrowie.pl/odzywianie/zdrowe-odzywianie/bmr-jak-obliczyc-zapotrzebowanie-kaloryczne-wzor-na-bmr-i-cpm-aa-YXQB-YEmG-3J9B.html
