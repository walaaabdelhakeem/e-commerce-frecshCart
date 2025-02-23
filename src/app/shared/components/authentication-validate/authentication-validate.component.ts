import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'authentication-validate',
  imports: [],
  templateUrl: './authentication-validate.component.html',
  styleUrl: './authentication-validate.component.css'
})
export class AuthenticationValidateComponent {
@Input() control?:AbstractControl|null
}
