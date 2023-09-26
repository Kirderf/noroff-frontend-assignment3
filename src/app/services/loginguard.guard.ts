import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  canActivate(): boolean {
    if (localStorage.getItem('user') != null) return false;
    return true;
  }
}

export const loginCanActivateTeam: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const guardService = inject(AuthGuardService);
  const canActivate = guardService.canActivate();

  if (!canActivate) {
    const router = inject(Router);
    router.navigate(['/pokedex']);
  }

  return canActivate;
};