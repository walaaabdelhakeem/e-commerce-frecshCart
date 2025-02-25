import { Component, inject, OnInit } from '@angular/core';
import { CartItemsComponent } from "../cart-items/cart-items.component";
import { CartservicesService } from '../../services/cartservices.service';
import { Icart } from '../../models/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemsComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  private productscart = inject(CartservicesService);
  cartItem: Icart = {} as Icart

  isloading = false;
  getallProductCart() {
    this.isloading = false;
    this.productscart.getLoggeduse().subscribe({
      next: (res) => {
        this.cartItem = res
        this.isloading = true
        this.productscart.counter.next(res.numOfCartItems)
        console.log(res)
      }
    })
  }
  removeproduct(id: string) {
    this.productscart.removespecificcartItem(id).subscribe({
      next: (res) => {
        this.cartItem = res
        console.log(res)
        this.productscart.counter.next(res.numOfCartItems)
      }
    })
  }
  udatecounter(id: string, count: number) {
    this.productscart.updateQuantityOfCart(id, count).subscribe({
      next: (res) => {
        this.cartItem = res
      }
    })
  }
  deleteall() {
    this.productscart.Clearusercart().subscribe({
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
}
