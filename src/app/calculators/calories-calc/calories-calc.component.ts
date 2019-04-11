import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calories-calc',
  templateUrl: './calories-calc.component.html',
  styleUrls: ['./calories-calc.component.css']
})
export class CaloriesCalcComponent implements OnInit {

  result;
  maintenanceCalories;
  trainingGoal;
  submitted = false;

  caloriesForm: FormGroup;
  genders = [
    {id: 1, name: 'Mężczyzna'},
    {id: 2, name: 'Kobieta'},
  ]
  
  activities = [
    {id: 1, name: 'brak aktywności, praca siedząca'},
    {id: 2, name: 'niska aktywność (praca siedząca i 1-2 treningi w tygodniu)'},
    {id: 3, name: 'średnia aktywność (praca siedząca i treningi 3-4 razy w tygodniu)'},
    {id: 4, name: 'wysoka aktywność (praca fizyczna i 3-4 treningi w tygodniu)'},
    {id: 5, name: 'bardzo wysoka aktywność (zawodowi sportowcy, osoby codziennie trenujące)'},
  ];
  goals = [
    {id: 1, name: 'dieta redukcyjna'},
    {id: 2, name: 'dieta mięśniowa'}
  ];

  constructor() {}

  ngOnInit(){
    this.caloriesForm = new FormGroup({
      'gender': new FormControl(''),
      'height': new FormControl(''),
      'weight': new FormControl(''),
      'age': new FormControl(''),
      'activity': new FormControl(''),
      'goal': new FormControl('')
    })
  }

  onSubmit(){
    this.submitted = true;
    this.calc_Calories();
  }

  calc_Calories() {
    const wei = 9.99 * this.caloriesForm.value.weight;
    const hei = 6.25 * this.caloriesForm.value.height;
    const ag = 4.92 * this.caloriesForm.value.age;

    if (this.caloriesForm.value.gender === 1) {
      this.result = ((wei + hei - ag) + 5).toFixed(2);
    } else {
      this.result = ((wei + hei - ag) - 161).toFixed(2);
    }
    this.calcCPM();
    this.checkGoals();
  }

  calcCPM() {
    const activity = this.caloriesForm.value.activity;
    switch(Number(activity)){
      case 1:
        this.maintenanceCalories = (this.result * 1.2).toFixed(2);
        break;
      case 2:
        this.maintenanceCalories = (this.result * 1.35).toFixed(2);
        break;
      case 3:
        this.maintenanceCalories = (this.result * 1.55).toFixed(2);
        break;
      case 4:
        this.maintenanceCalories = (this.result * 1.75).toFixed(2);
        break;
      case 5: 
        this.maintenanceCalories = (this.result * 2.05).toFixed(2);
        break;
    }
 
  }

  checkGoals() {
    const goal = this.caloriesForm.value.goal;
    if(goal == 1) {
      this.trainingGoal = parseFloat(this.maintenanceCalories) - 250;
    } else {
      this.trainingGoal = parseFloat(this.maintenanceCalories) + 250;
    }
  }

}

//Źródło jakby komu nie pasowało :D
//https://wformie24.poradnikzdrowie.pl/odzywianie/zdrowe-odzywianie/bmr-jak-obliczyc-zapotrzebowanie-kaloryczne-wzor-na-bmr-i-cpm-aa-YXQB-YEmG-3J9B.html
