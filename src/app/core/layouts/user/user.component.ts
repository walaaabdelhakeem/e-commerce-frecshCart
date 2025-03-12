import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  uptop() {
    scrollTo({ top: 0, behavior: 'smooth' })
  }
  showbtn = false
  @HostListener('window:scroll')
  just() {
    let scrol = document.documentElement.scrollTop
    if (scrol > 800) {
      this.showbtn = true
    }else
    {
      this.showbtn = false
    }
  }
}
