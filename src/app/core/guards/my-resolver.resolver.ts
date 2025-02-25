import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { of, map, catchError } from 'rxjs';
import { IauthService } from '../auth/services/iauth.service';

export const myResolverResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(IauthService);
  const router = inject(Router);

  const tokenExists = !!authService.checkifuserExist();
  if (!tokenExists) {
    console.log('No token found, redirecting to login...');
    router.navigate(['/login']);
    return of(false);
  }

  return authService.verifyToken().pipe(
    map(res => {
      console.log('Token valid:', res.message);
      return true;
    }),
    catchError(error => {
      console.log('Token invalid:', error);
      authService.logoutfunc(); // ✅ لو التوكين غير صالح، يعمل لوجاوت
      router.navigate(['/login']);
      return of(false);
    })
  );
};
