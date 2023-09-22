import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { TrainerComponent } from './components/trainer/trainer.component';

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
