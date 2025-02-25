import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IauthService } from '../../../core/auth/services/iauth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartservicesService } from '../../../features/cart/services/cartservices.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  @Input() layout: string = '';
    private cartservicesService = inject(CartservicesService)
  
    count:number=0
  private readonly logout = inject(IauthService);
  platformId = inject(PLATFORM_ID);

  logoutuser(): void {
    if (isPlatformBrowser(this.platformId)) { this.logout.logoutfunc(); }
  }
  ngOnInit(): void {
   this.cartservicesService.counter.subscribe({
    next:(res)=>{
this.count=res;
    }
   })
   this.cartservicesService.getLoggeduse().subscribe({
    next:(res)=>{
      this.count= res.numOfCartItems
    }
   })

  }
}
