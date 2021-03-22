import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginGuard } from './guards/login.guard';
import { PokemonCreateComponent } from './pokemon/pokemon-create/pokemon-create.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "pokemon", canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: PokemonComponent },
      { path: 'create', component: PokemonCreateComponent },
      { path: 'edit/:id', component: PokemonEditComponent },
    ]},
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  { path: "**", redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
