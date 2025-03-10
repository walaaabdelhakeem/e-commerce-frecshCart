import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { IauthService } from '../../services/iauth.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationValidateComponent } from '../../../../shared/components/authentication-validate/authentication-validate.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AuthenticationValidateComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy {
  isloading: boolean = false;
  showpassword = false
  private readonly registerservice = inject(IauthService);
  private readonly router = inject(Router);
  private readonly formbuilder = inject(FormBuilder);
  massageError: string = '';
  registerGroup!: FormGroup;
    private unsub:Subscription=new Subscription()
  
  // registerGroup  = new FormGroup({
  formregister() {
    this.registerGroup = this.formbuilder.group({

      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)
      ]]

    })
  }
  ngOnInit(): void {
    this.formregister()
  }


  onSubmit() {
    this.isloading = true
    if (this.registerGroup.valid) {
      console.log(this.registerGroup);
    this.unsub=  this.registerservice.login(this.registerGroup.value).subscribe({
        next: (res) => {
          this.isloading = false;
          if (res.message = 'success') {
            this.registerservice.setLocalstorgeToken(res.token)
            this.router.navigate(['/home'])
          }
        }, error: ({ error }) => {
          this.massageError = error.message;
          this.isloading = false
        }
      })
    } else {
      this.registerGroup.markAllAsTouched()
    }
  }
  
  
  shpwpass() {
    this.showpassword = !this.showpassword
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }
}

