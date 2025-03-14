import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IauthService } from '../auth/services/iauth.service';

export const homeguardGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const iauthService = inject(IauthService);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = !!iauthService.checkifuserExist();
  if (!token) {
    console.log('no token found');
    router.navigate(['/login']);
    return false;
  }

return true
};
