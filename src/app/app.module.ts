import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginService } from "./login.service";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { RegisterComponent } from "./register/register.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShopComponent } from "./shop/shop.component";
import { ArticlesComponent } from "./articles/articles.component";
import { DietComponent } from "./diet/diet.component";
import { OpinionsComponent } from "./opinions/opinions.component";
import { ChatComponent } from "./chat/chat.component";
import { BmiCalcComponent } from "./calculators/bmi-calc/bmi-calc.component";
import { CaloriesCalcComponent } from ".//calculators/calories-calc/calories-calc.component";
import { MatStepperModule } from "@angular/material/stepper";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterDetailsComponent } from "./register-details/register-details.component";
import { ProgrammesComponent } from "./programmes/programmes.component";
import { EmployeeComponent } from "./employee/employee.component";
import { ArticlesService } from "./articles/articles.service";
import { ChatService } from "./chat/chat.service";
import { OpinionsDietsComponent } from "./opinions/opinions-diets/opinions-diets.component";
import { OpinionsTrainersComponent } from "./opinions/opinions-trainers/opinions-trainers.component";
import { OpinionsTrainersService } from "./opinions/opinions-trainers/opinions-trainers.service";
import { OpinionsTrainersListComponent } from "./opinions/opinions-trainers/opinions-trainers-list/opinions-trainers-list.component";
import { OpinionsTrainerDetailsComponent } from "./opinions/opinions-trainers/opinions-trainer-details/opinions-trainer-details.component";
import { OpinionsDietService } from "./opinions/opinions-diets/opinions-diet.service";
import { TrainingPlanComponent } from "./training-plan/training-plan.component";
import { SafeUrlPipe } from "./articles/safe-url-pipe.pipe";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";

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
    EmployeeComponent,
    OpinionsDietsComponent,
    OpinionsTrainersComponent,
    OpinionsTrainersListComponent,
    OpinionsTrainerDetailsComponent,
    TrainingPlanComponent,
    SafeUrlPipe
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
    MatRadioModule,
    MatExpansionModule,
    MatSelectModule
  ],
  providers: [
    LoginService,
    ArticlesService,
    OpinionsTrainersService,
    OpinionsDietService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
