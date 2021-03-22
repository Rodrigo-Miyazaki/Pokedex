import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './services/login-service/login-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonCreateComponent } from './pokemon/pokemon-create/pokemon-create.component';
import { PokemonServiceService } from './services/pokemon-service/pokemon-service.service';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PokemonComponent,
    PokemonCreateComponent,
    PokemonEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxBootstrapMultiselectModule
  ],
  providers: [LoginServiceService, PokemonServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
