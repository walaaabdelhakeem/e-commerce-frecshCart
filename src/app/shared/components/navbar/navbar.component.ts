import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IauthService } from '../../../core/auth/services/iauth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartservicesService } from '../../../features/cart/services/cartservices.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() layout: string = '';
  private cartservicesService = inject(CartservicesService)
  private translationService = inject(TranslationService)

  count: Signal<number> = computed(() => this.cartservicesService.counter())
  private readonly logout = inject(IauthService);
  platformId = inject(PLATFORM_ID);

  logoutuser(): void {
    if (isPlatformBrowser(this.platformId)) { this.logout.logoutfunc(); }
  }
  ngOnInit(): void {
    // this.cartservicesService.counter.subscribe({
    //   next: (res) => {
    //     this.count = res;
    //   }
    // })
    this.cartservicesService.getLoggeduse().subscribe({
      next: (res) => {
        this.cartservicesService.counter.set( res.numOfCartItems)
      }
    })

  }

  changlang(lang: string) {
    this.translationService.changeLang(lang)
    window.location.reload()
  }

}
