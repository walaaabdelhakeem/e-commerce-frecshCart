import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductservicesService } from '../../services/productservices.service';
import { Iproduct } from '../../models/iproduct';
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';
import { GuantityPipe } from '../../../../shared/pipes/guantity.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [GuantityPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly idhttp = inject(ProductservicesService)
  private cartservicesService = inject(CartservicesService)
  private toastr = inject(ToastrService)
  id: string | null = ''
  detailsProduct: Iproduct = {} as Iproduct
  private unsub:Subscription=new Subscription()
  getproductId() {

 this.unsub=   this.ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')
      }
    })
  }
  getproductIddetails() {
    this.idhttp.getproductdetails(this.id).subscribe({
      next: ({ data }) => {
        this.detailsProduct = data
      }
    })
  }
  addtocartputn(id:string) {
    this.cartservicesService.addTOCart(id).subscribe(
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
  itemsrc:string|null=''
  str(src:string|null){
    return this.itemsrc=src;
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }
}
