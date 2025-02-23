import { Component, inject, OnInit } from '@angular/core';
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { Iwishlist } from '../../mobels/iwishlist';
import { WishlistService } from '../../servises/wishlist.service';
import { WishItemComponent } from "../wish-item/wish-item.component";

@Component({
  selector: 'app-wish-list',
  imports: [WishItemComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit{
private wishlistService=inject(WishlistService);
wishlist:Iwishlist={}as Iwishlist

isloading=false;
getallProductwishlist(){
  this.isloading=false;
  this.wishlistService.getLoggedusewishlist().subscribe({
    next:(res)=>{
this.wishlist=res
this.isloading=true
console.log(res)
    }
  })
}
removeproduct(id:string){
  this.wishlistService.removespecificwishlistItem(id).subscribe({
    next:(res)=>{
      localStorage.setItem(`wishlist-${id}`, JSON.stringify(false));
     this.getallProductwishlist()
     console.log(res)
    }
  })
  
}

ngOnInit(): void {
  this.getallProductwishlist();
}
}


