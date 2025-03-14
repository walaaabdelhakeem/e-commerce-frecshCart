import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CartItem, Product, RootObject } from '../../model/alloprder';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DatePipe } from '@angular/common';
import { StarComponent } from "../../../../shared/components/star/star.component";
@Component({
  selector: 'app-allorders',
  imports: [CarouselModule, DatePipe, StarComponent],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private allorder = inject(OrderService);
 alldataorder: RootObject[] = [{}] as RootObject[];
 
  orderofuser() {
    this.allorder.getuserorder().subscribe({
      next: (res) => {
        this.alldataorder = res
        console.log( this.alldataorder)
      }
    })
  }
  customOptions: OwlOptions = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      rtl:document.documentElement.lang=='ar'?true:false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 3
        },
        740: {
          items: 4
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
  ngOnInit(): void {
    this.orderofuser()
  }
}
