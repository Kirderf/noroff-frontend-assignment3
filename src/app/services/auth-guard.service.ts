import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private userService: UserService) {}

  canActivate(): boolean {
    if (localStorage.getItem('user')) return true;
    return false;
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const guardService = inject(AuthGuardService);
  const canActivate = guardService.canActivate();

  if (!canActivate) {
    const router = inject(Router);
    router.navigate(['']);
  }

  return canActivate;
};
