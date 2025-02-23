import { Component, inject, Input, OnInit, output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { CartservicesService } from '../../../cart/services/cartservices.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
@Input() product!:Iproduct
addtocart=output<string>()
addtowish=output<string>()
colorhart:boolean=false
addtocartputn(){
  this.addtocart.emit(this.product._id)
}
addtowishlist(){
  this.colorhart = !this.colorhart;
  if(typeof localStorage!='undefined'){
    localStorage.setItem(`wishlist-${this.product._id}`, JSON.stringify(this.colorhart));
  }
  this.addtowish.emit(this.product._id);
  

}

ngOnInit() {
  // Load wishlist state from localStorage
  if (typeof localStorage !== 'undefined') {
    const savedState = localStorage.getItem(`wishlist-${this.product._id}`);
    this.colorhart = savedState ? JSON.parse(savedState) : false;
  }}
}
