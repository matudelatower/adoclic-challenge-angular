import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let retVal = inject(AuthService).isLoggedIn() ? true : false;

  if (!retVal) {
    inject(Router).navigate(['login']);
  }

  return retVal;
};
