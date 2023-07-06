import { AuthGuard } from './auth.guard'; // Käytetään authGuardia niissä komponenteissa joihin halutaan päästää vain kirjautuneet käyttäjät
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // oletusreitti tai uudelleenohjaus palvelimen juuresta
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditrecipeComponent,
  },
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] }, // reitti komponenttiin joka näyttää kaikki reseptit
  {
    path: 'addrecipe',
    component: AddrecipeComponent,
    canActivate: [AuthGuard],
  }, // reitti komponenttiin josta voi lisätä reseptejä
  { path: 'detail/:id', component: RecipeDetailComponent }, // reitti yksittäiseen reseptiin
  { path: 'login', component: LoginComponent }, // reitti kirjautumiskomponenttiin
  { path: 'register', component: RegisterComponent }, // reitti rekisteröitymiskomponenttiin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
