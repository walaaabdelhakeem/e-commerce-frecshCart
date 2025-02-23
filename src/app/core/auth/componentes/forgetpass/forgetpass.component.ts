import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../../../../features/orders/services/order.service';
import { AuthenticationValidateComponent } from '../../../../shared/components/authentication-validate/authentication-validate.component';
import { ForgetpasswordService } from '../../services/forgetpassword.service';
import { IauthService } from '../../services/iauth.service';

@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule, AuthenticationValidateComponent],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {

  isloading: boolean = false;
  showpassword = false
  private readonly forgetpasswordService = inject(ForgetpasswordService);
  private readonly authService = inject(IauthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  
  private readonly router = inject(Router);
  private readonly formbuilder = inject(FormBuilder);
  massageError: string = '';
  cartid:string|null=''
  emailGroup!: FormGroup;
  resetCodegroup!: FormGroup;
  repasswordgroup!: FormGroup;
  step:number=1;
  // checkoutGroup  = new FormGroup({
  formcheckout() {
    this.emailGroup = this.formbuilder.group({

      email: [null, [
        Validators.required,
        Validators.email
      ]]
  })
    this.resetCodegroup = this.formbuilder.group({

      resetCode: [null, [
        Validators.required
      ]]
    })
    this.repasswordgroup = this.formbuilder.group({
      newPassword: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)
      ]],email: [null, [
        Validators.required,
        Validators.email
      ]]
    })
  }
  ngOnInit(): void {
    this.formcheckout()
   
  }
  shpwpass() {
    this.showpassword = !this.showpassword
  }
  onSubmit() {
    this.isloading = true
    if (this.emailGroup.valid) {
      this.forgetpasswordService.forgotPassword(this.emailGroup.value).subscribe({
        next:(res)=>{
          if(res.statusMsg==='success'){
            this.step=2
            this.isloading = false
          }
        }
      })
    } 
  }
 
  onSubmitcode() {
    this.isloading = true
    if (this.resetCodegroup.valid) {
      this.forgetpasswordService.verifyResetCode(this.resetCodegroup.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status==='Success'){
            this.step=3
            this.isloading = false
          }
        }
      })
    } 
  }
 
  onSubmitreset() {
    this.isloading = true
    if (this.repasswordgroup.valid) {
      this.forgetpasswordService.resetPassword(this.repasswordgroup.value).subscribe({
        next:(res)=>{
          this.authService.setLocalstorgeToken(res.token)
            this.router.navigate(['/home'])
        }
      })
    } 
  }
}

