import { Component, inject, OnInit } from '@angular/core';
import { ProductservicesService } from '../../services/productservices.service';
import { Iproduct } from '../../models/iproduct';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/servises/wishlist.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  allProducts: Iproduct[] = []
  private products = inject(ProductservicesService)
  private cartservicesService = inject(CartservicesService)
  private wishlistService = inject(WishlistService)
  private toastr=inject( ToastrService)
  getAllProduct() {
    this.products.getproducts().subscribe({
      next: ({ data }) => {
        console.log(data)
        this.allProducts = data;
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  
  
  addtocartputn(id: string) {
    this.cartservicesService.addTOCart(id).subscribe(
      {
        next: (res) => {
          console.log(res)
          this.showToastr('Product added successfully');
          this.cartservicesService.counter.next(res.numOfCartItems)
        }
      })
  }
  addtowishlist(id: string) {
    let isInWishlist = JSON.parse(localStorage.getItem(`wishlist-${id}`) || 'false');
  
    if (isInWishlist) { 
      this.wishlistService.addTOwishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          this.showToastr('Product added successfully');
          localStorage.setItem(`wishlist-${id}`, JSON.stringify(true));
        }
      });
    } else { 
      this.wishlistService.removespecificwishlistItem(id).subscribe({
        next: (res) => {
          console.log(res);
          this.showToastr('haert removed successfully ');
          localStorage.setItem(`wishlist-${id}`, JSON.stringify(false));
        }
      });
    }
  }
  
  showToastr(msg:string) {
    this.toastr.success(msg,"",{
      closeButton:true,
      timeOut:4000,
      easing:'ease-in-out',
      // easeTime:1000,
      progressBar:true
    });
  }
  ngOnInit(): void {
    this.getAllProduct()
  }
}
