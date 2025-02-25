import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IauthService } from '../../../core/auth/services/iauth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() layout: string = ''
  
  private readonly logout = inject(IauthService);
  platformId = inject(PLATFORM_ID);

  logoutuser(): void {
    if (isPlatformBrowser(this.platformId)) { this.logout.logoutfunc(); }
  }
  
}
