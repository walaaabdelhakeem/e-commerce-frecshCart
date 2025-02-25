import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductservicesService } from '../../services/productservices.service';
import { Iproduct } from '../../models/iproduct';
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly idhttp = inject(ProductservicesService)
  private cartservicesService = inject(CartservicesService)
  private toastr = inject(ToastrService)
  id: string | null = ''
  detailsProduct: Iproduct = {} as Iproduct
  getproductId() {

    this.ActivatedRoute.paramMap.subscribe({
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
          this.cartservicesService.counter.next(res.numOfCartItems);
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
}
