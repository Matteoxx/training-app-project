import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopComponent } from './shop/shop.component';
import { ArticlesComponent } from './articles/articles.component';
import { DietComponent } from './diet/diet.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { ChatComponent } from './chat/chat.component';
import { BmiCalcComponent } from './calculators/bmi-calc/bmi-calc.component';
import { CaloriesCalcComponent } from './/calculators/calories-calc/calories-calc.component';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterDetailsComponent } from './register-details/register-details.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    ShopComponent,
    ArticlesComponent,
    DietComponent,
    OpinionsComponent,
    ChatComponent,
    BmiCalcComponent,
    CaloriesCalcComponent,
    RegisterDetailsComponent,
    ProgrammesComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
