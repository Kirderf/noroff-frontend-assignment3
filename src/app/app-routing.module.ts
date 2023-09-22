import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { TrainerComponent } from './trainer/trainer.component';

const routes: Routes = [
  
    {path: '', component: LoginPageComponent},
    {path:'pokedex',component:PokedexComponent},
    {path:'trainer',component:TrainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
