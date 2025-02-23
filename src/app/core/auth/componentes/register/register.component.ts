import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationValidateComponent } from "../../../../shared/components/authentication-validate/authentication-validate.component";
import { IauthService } from '../../services/iauth.service';
import { validaterepassword } from '../../../../shared/helpers/funpassword';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, AuthenticationValidateComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isloading: boolean = false;
  showpassword = false
  private readonly registerservice = inject(IauthService);
  private readonly router = inject(Router);
  massageError: string = '';
  registerGroup!: FormGroup
  formregister() {
    this.registerGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)
      ]),
      rePassword: new FormControl(null, [
        Validators.required
      ])
    }, { validators: validaterepassword })

  }
  ngOnInit(): void {
    this.formregister()
  }
 
  onSubmit() {
    this.isloading = true
    if (this.registerGroup.valid) {
      console.log(this.registerGroup);
      this.registerservice.register(this.registerGroup.value).subscribe({
        next: (res) => {
          this.isloading = false;
          console.log(res)
          if (res.message == 'success') {
            this.router.navigate(['/login'])
            
          }
        }, error: ({ error }) => {
          this.massageError = error.message;
          this.isloading = false
          console.log(error)

        }
      })
    } else {
      this.registerGroup.markAllAsTouched()

    }
  }
  shpwpass() {
    this.showpassword = !this.showpassword
  }
}
