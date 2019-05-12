import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ShopComponent } from "./shop/shop.component";
import { ArticlesComponent } from "./articles/articles.component";
import { DietComponent } from "./diet/diet.component";
import { OpinionsComponent } from "./opinions/opinions.component";
import { ChatComponent } from "./chat/chat.component";
import { BmiCalcComponent } from "./calculators/bmi-calc/bmi-calc.component";
import { CaloriesCalcComponent } from "./calculators/calories-calc/calories-calc.component";
import { RegisterDetailsComponent } from "./register-details/register-details.component";
import { ProgrammesComponent } from "./programmes/programmes.component";
import { EmployeeComponent } from "./employee/employee.component";
import { LoginComponent } from "./login/login.component";
import { OpinionsDietsComponent } from "./opinions/opinions-diets/opinions-diets.component";
import { OpinionsTrainersComponent } from "./opinions/opinions-trainers/opinions-trainers.component";
import { OpinionsTrainerDetailsComponent } from "./opinions/opinions-trainers/opinions-trainer-details/opinions-trainer-details.component";
import { TrainingPlanComponent } from "./training-plan/training-plan.component";

//zabezpieczyc sciezki
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "details", component: RegisterDetailsComponent },
  { path: "home", component: HomeComponent },
  { path: "programmes", component: ProgrammesComponent },
  { path: "shop", component: ShopComponent },
  { path: "articles", component: ArticlesComponent },
  { path: "diet", component: DietComponent },
  { path: "chat", component: ChatComponent },
  {
    path: "opinions",
    component: OpinionsComponent,
    children: [
      { path: "diets", component: OpinionsDietsComponent },
      {
        path: "trainers",
        component: OpinionsTrainersComponent,
        children: [{ path: ":id", component: OpinionsTrainerDetailsComponent }]
      }
    ]
  },
  { path: "bmi", component: BmiCalcComponent },
  { path: "calories", component: CaloriesCalcComponent },
  { path: "employee", component: EmployeeComponent },
  { path: "trainingPlan", component: TrainingPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
