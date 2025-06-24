import { Component} from '@angular/core'; 
import { AbstractControl, FormControl,FormGroup,ValidationErrors,ValidatorFn,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 
 
import { passwordStrengthValidator } from '../../shared/components/password/password.validator';


@Component({
  selector: 'app-register',
    standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {  

  protected form = new FormGroup({
      name: new FormControl("pepe", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)
      ]),
      email: new FormControl("asd@asd.es", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      ]),
      password: new FormControl("aaA1!aaaa",  [Validators.required, passwordStrengthValidator()]),
      confirmPassword: new FormControl("aaA1!aaaa",  [Validators.required]),
      termsAccepted : new FormControl("true",  [Validators.required]),
  },
  {
    validators: [this.matchPasswordsValidator()]
  });

  constructor(){    
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const key = event.key;
    const regex = /^[a-zA-Z\s]$/;

    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false; 
    return control.invalid && (control.touched || control.dirty);
  }

  matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value; 
      return password === confirm ? null : { notMatching: true };
    };
  } 
  
  passwordShowhide(input: any, eye:string):void {
    var eyeButton = document.querySelector(eye);
    eyeButton!.classList.toggle('fa-eye-slash');     
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
