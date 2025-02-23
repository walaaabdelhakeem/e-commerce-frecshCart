import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IauthService } from '../auth/services/iauth.service';

export const userExistGuard: CanActivateFn = (route, state) => {
  const platform_id=inject(PLATFORM_ID);
  const router=inject(Router)
  const iauthService=inject(IauthService)
  const userexist=!!iauthService.checkifuserExist()
  console.log(userexist)
  if(isPlatformBrowser(platform_id))
  {
    if(userexist)
    {
      console.log('in')
      router.navigate(['/home'])
      return false
    }else
    {return true}
  }else
  {
    return false
  }
};
