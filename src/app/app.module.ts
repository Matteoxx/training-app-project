import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopComponent } from './shop/shop.component';
import { ArticlesComponent } from './articles/articles.component';
import { DietComponent } from './diet/diet.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { ChatComponent } from './chat/chat.component';
import { DailyPlanComponent } from './daily-plan/daily-plan.component';
import { WeeklyPlanComponent } from './weekly-plan/weekly-plan.component';
import { BmiCalcComponent } from './bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from './calories-calc/calories-calc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ShopComponent,
    ArticlesComponent,
    DietComponent,
    OpinionsComponent,
    ChatComponent,
    DailyPlanComponent,
    WeeklyPlanComponent,
    BmiCalcComponent,
    CaloriesCalcComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
