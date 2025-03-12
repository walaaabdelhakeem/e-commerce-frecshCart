import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductservicesService } from '../../services/productservices.service';
import { Iproduct } from '../../models/iproduct';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/servises/wishlist.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent,FormsModule,SearchPipe,NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit,OnDestroy {
  textsearch:string=''
  page: number = 1; 
  total:number=1;
  allProducts: Iproduct[] = []
  private products = inject(ProductservicesService)
  private cartservicesService = inject(CartservicesService)
  private wishlistService = inject(WishlistService)
  private toastr=inject( ToastrService)
  private unsub:Subscription=new Subscription()
  private unsub2:Subscription=new Subscription()
  private unsub3:Subscription=new Subscription()
  
  getAllProduct() {
  this.unsub= this.products.getproducts(this.page).subscribe({
      next: ( data ) => {
        console.log(data)
        this.allProducts = data.data;
        this.total=data.results;
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  
  
  addtocartputn(id: string) {
   this.unsub2= this.cartservicesService.addTOCart(id).subscribe(
      {
        next: (res) => {
          console.log(res)
          this.showToastr('Product added successfully');
          this.cartservicesService.counter.set(res.numOfCartItems)
        }
      })
  }
  addtowishlist(id: string) {
    let isInWishlist = JSON.parse(localStorage.getItem(`wishlist-${id}`) || 'false');
  
    if (isInWishlist) { 
   this.unsub2=this.wishlistService.addTOwishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          this.showToastr('Product added successfully');
          localStorage.setItem(`wishlist-${id}`, JSON.stringify(true));
        }
      });
    } else { 
      this.unsub3=this.wishlistService.removespecificwishlistItem(id).subscribe({
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
  changepage(event:number){
    this.page=event;
    this.getAllProduct()
  }
  ngOnInit(): void {
    this.getAllProduct()
    
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
    this.unsub2.unsubscribe()
    this.unsub3.unsubscribe()
  }
}
