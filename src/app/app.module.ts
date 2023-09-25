import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TrainerPageComponent } from './trainer/trainer-page.component';
import { PokedexPageComponent } from './pokedex/pokedex-page.component';
import { HttpClientModule } from  '@angular/common/http';
import { PokemonDisplayComponent } from './trainer/pokemon-display/pokemon-display/pokemon-display.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    TrainerPageComponent,
    PokedexPageComponent,
    PokemonDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
