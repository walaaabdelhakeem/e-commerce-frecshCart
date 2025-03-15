import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IauthService } from '../auth/services/iauth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService=inject(IauthService)
if(typeof localStorage!=='undefined'){
if(!!localStorage.getItem('token')){
  req=req.clone({
    setHeaders:{
      token:authService.checkifuserExist()||""
    }
  })}}
  return next(req);
};
