import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductservicesService } from '../../services/productservices.service';
import { Iproduct } from '../../models/iproduct';
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';
import { GuantityPipe } from '../../../../shared/pipes/guantity.pipe';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [GuantityPipe, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly idhttp = inject(ProductservicesService)
  private cartservicesService = inject(CartservicesService)
  private toastr = inject(ToastrService)
  id: string | null = ''
  detailsProduct: Iproduct = {} as Iproduct
  private unsub: Subscription = new Subscription()
  private unsub2: Subscription = new Subscription()
  private unsub3: Subscription = new Subscription()

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    rtl: document.documentElement.lang == 'ar' ? true : false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 5 }
    },
    nav: false
  }
  getproductId() {
    this.unsub = this.ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')
      }
    })
  }
  getproductIddetails() {
    this.unsub2 = this.idhttp.getproductdetails(this.id).subscribe({
      next: ({ data }) => {
        this.detailsProduct = data
      }
    })
  }
  addtocartputn(id: string) {
    this.unsub3 = this.cartservicesService.addTOCart(id).subscribe(
      {
        next: (res) => {
          console.log(res)
          this.cartservicesService.counter.set(res.numOfCartItems);
          this.showToastr('Product added successfully');
        }
      })
  }
  showToastr(msg: string) {
    this.toastr.success(msg, "", {
      closeButton: true,
      timeOut: 4000,
      easing: 'ease-in-out',
      // easeTime:1000,
      progressBar: true
    });
  }
  ngOnInit(): void {
    this.getproductId();
    this.getproductIddetails();
  }
  itemsrc: string | null = ''
  str(src: string | null) {
    return this.itemsrc = src;
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
    this.unsub2.unsubscribe()
    this.unsub3.unsubscribe()
  }
}
