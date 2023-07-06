import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuppliesFormComponent } from './addrecipe/supplies-form/supplies-form.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';

@NgModule({
  declarations: [
    AppComponent,
    AddrecipeComponent,
    NavbarComponent,
    DashboardComponent,
    RecipesComponent,
    RecipeDetailComponent,
    LoginComponent,
    RegisterComponent,
    SuppliesFormComponent,
    EditrecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
