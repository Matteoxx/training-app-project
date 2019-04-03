import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ArticlesComponent } from './articles/articles.component';
import { DietComponent } from './diet/diet.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { ChatComponent } from './chat/chat.component';
import { BmiCalcComponent } from './calculators/bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from './calculators/calories-calc/calories-calc.component';
import { RegisterDetailsComponent } from './register-details/register-details.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';

//zabezpieczyc sciezki
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'details', component: RegisterDetailsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'programmes', component: ProgrammesComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'diet', component: DietComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'opinions', component: OpinionsComponent},
  {path: 'bmi', component: BmiCalcComponent},
  {path: 'calories', component: CaloriesCalcComponent},
  {path: 'employee', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
