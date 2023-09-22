import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PokedexPageComponent } from './pokedex/pokedex-page.component';
import { TrainerPageComponent } from './trainer/trainer-page.component';

const routes: Routes = [
  
    {path: '', component: LoginPageComponent},
    {path:'pokedex',component:PokedexPageComponent},
    {path:'trainer',component:TrainerPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
