import { Component, inject, Input, OnDestroy, output } from '@angular/core';
import { Datum } from '../../mobels/iwishlist';
import { CartservicesService } from '../../../cart/services/cartservices.service';
import { ToastrService } from 'ngx-toastr';
import { unsubscribe } from 'node:diagnostics_channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-item',
  imports: [],
  templateUrl: './wish-item.component.html',
  styleUrl: './wish-item.component.css'
})
export class WishItemComponent implements OnDestroy{
@Input() productitem:Datum={}as Datum 
  private cartservicesService = inject(CartservicesService)
private toastr=inject( ToastrService);
colseitemid=output<string>();
private  unsub:Subscription= new  Subscription()
removeitem(){
  this.colseitemid.emit(this.productitem._id)
}
addtocartputn(id: string) {
 this.unsub= this.cartservicesService.addTOCart(id).subscribe(
    {
      next: (res) => {
        this.removeitem()
        this.showToastr('Product added successfully');
        this.cartservicesService.counter.set(res.numOfCartItems)
      }
    })
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
ngOnDestroy(): void {
  this.unsub.unsubscribe()
}
}
