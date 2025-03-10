import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartItemsComponent } from "../cart-items/cart-items.component";
import { CartservicesService } from '../../services/cartservices.service';
import { Icart } from '../../models/icart';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemsComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit,OnDestroy {
  private productscart = inject(CartservicesService);
  cartItem: Icart = {} as Icart
  private unsub:Subscription=new Subscription()
  private unsub2:Subscription=new Subscription()
  private unsub3:Subscription=new Subscription()
  private unsub4:Subscription=new Subscription()

  isloading = false;
  getallProductCart() {
    this.isloading = false;
   this.unsub= this.productscart.getLoggeduse().subscribe({
      next: (res) => {
        this.cartItem = res
        this.isloading = true
        this.productscart.counter.set(res.numOfCartItems)
        console.log(res)
      }
    })
  }
  removeproduct(id: string) {
  this.unsub2=  this.productscart.removespecificcartItem(id).subscribe({
      next: (res) => {
        this.cartItem = res
        console.log(res)
        this.productscart.counter.set(res.numOfCartItems)
      }
    })
  }
  udatecounter(id: string, count: number) {
  this.unsub3=  this.productscart.updateQuantityOfCart(id, count).subscribe({
      next: (res) => {
        this.cartItem = res
      }
    })
  }
  deleteall() {
   this.unsub4= this.productscart.Clearusercart().subscribe({
      next: (res) => {
        console.log(res)

        if (res.message == 'success') {
          this.getallProductCart()
        }
      }
    })
  }

  ngOnInit(): void {
    this.getallProductCart();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
    this.unsub2.unsubscribe()
    this.unsub3.unsubscribe()
    this.unsub4.unsubscribe()
  }
}
