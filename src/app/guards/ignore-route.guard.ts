import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const ignoreRouteGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token != null && token != '' && token.trim() != '') {
    const router = inject(Router);
    router.navigate(['/integration']);
    return false;
  }

  return true;
};
