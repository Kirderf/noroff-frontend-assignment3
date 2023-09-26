import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PokedexPageComponent } from './pokedex/pokedex-page.component';
import { TrainerPageComponent } from './trainer/trainer-page.component';
import { loginCanActivateTeam } from './services/loginguard.guard';
import { authCanActivateTeam } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent , canActivate: [loginCanActivateTeam]},
  {
    path: 'pokedex',
    component: PokedexPageComponent,
    canActivate: [authCanActivateTeam],
  },
  {
    path: 'trainer',
    component: TrainerPageComponent,
    canActivate: [authCanActivateTeam],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
