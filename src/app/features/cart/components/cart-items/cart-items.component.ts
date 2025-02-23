import { Component, Input, input, output } from '@angular/core';
import {  Product2 } from '../../models/icart';

@Component({
  selector: 'app-cart-items',
  imports: [],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {
@Input() productitem:Product2={}as Product2 
colseitemid=output<string>();
inctreaseordectese=output<{id:string,count:number}>();
removeitem(){
  this.colseitemid.emit(this.productitem.product._id)
}
update(count:number)
{
  this.inctreaseordectese.emit({id:this.productitem.product._id,count:count})
}
}
