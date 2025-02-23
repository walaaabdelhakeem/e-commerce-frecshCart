import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IauthService } from '../../../../core/auth/services/iauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationValidateComponent } from '../../../../shared/components/authentication-validate/authentication-validate.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, AuthenticationValidateComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  isloading: boolean = false;
  showpassword = false
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formbuilder = inject(FormBuilder);
  massageError: string = '';
  cartid:string|null=''
  checkoutGroup!: FormGroup;
  // checkoutGroup  = new FormGroup({
  formcheckout() {
    this.checkoutGroup = this.formbuilder.group({

      details: [null, [
        Validators.required
      ]],
      phone: [null, [
        Validators.required
      ]],
      city: [null, [
        Validators.required
      ]],
    })
  }
  ngOnInit(): void {
    this.formcheckout()
    this.getcrtid();
  }

getcrtid(){
this.activatedRoute.paramMap.subscribe({
  next:(res)=>{
this.cartid=res.get('cartid')
  }
})
}
  onSubmit() {
    this.isloading = true
    if (this.checkoutGroup.valid) {
      this.orderService.Checkoutsession(this.cartid,this.checkoutGroup.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.isloading=false;
          open(res.session.url,"_self")
        }
      })
    } else {
      this.checkoutGroup.markAllAsTouched()
    }
  }
 
}
