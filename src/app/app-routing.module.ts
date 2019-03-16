import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ArticlesComponent } from './articles/articles.component';
import { DietComponent } from './diet/diet.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { ChatComponent } from './chat/chat.component';
import { DailyPlanComponent } from './daily-plan/daily-plan.component';
import { WeeklyPlanComponent } from './weekly-plan/weekly-plan.component';
import { BmiCalcComponent } from './bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from './calories-calc/calories-calc.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'diet', component: DietComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'opinions', component: OpinionsComponent},
  {path: 'dailyPlan', component: DailyPlanComponent},
  {path: 'weeklyPlan', component: WeeklyPlanComponent},
  {path: 'bmi', component: BmiCalcComponent},
  {path: 'calories', component: CaloriesCalcComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
