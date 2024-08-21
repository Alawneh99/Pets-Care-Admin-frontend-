import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the token exists

  if (isLoggedIn) {
    return true;
  } else {
    // Redirect to the login page with the returnUrl as a query parameter
    router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};