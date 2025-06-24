import { Component, effect} from '@angular/core'; 
import { AbstractControl, FormControl,FormGroup,ValidationErrors,ValidatorFn,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 
 
import { passwordStrengthValidator } from '../../shared/components/password/password.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterDto } from 'src/app/core/interfaces/user.dto';


@Component({
  selector: 'app-register',
    standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {  

  loading:boolean  = true; 

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
      }
  ); 

  constructor( 
    
     private router: Router, 
     private _authService: AuthService,){    

    effect(() => {       
      let pepe = this._authService.user(); 
      if(pepe.email!="") {
        this.router.navigate(['/home']);   
      }
    },{ allowSignalWrites: true }); 

    effect(() => {       
      this.loading = this._authService.loading(); 
    },{ allowSignalWrites: true }); 

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

  register(){

    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }
 
    const body: RegisterDto = {
      name: this.form.value.name ?? "",
      email: this.form.value.email ?? "",
      password: this.form.value.password ?? "",
    };

    console.log("data a grabar")

    this._authService.register(body) 
    // .subscribe(
    //   (response: any) => {   
    //     this.loading = false;
    //      console.log("response__",response)
    //     this.router.navigate(['/home']);     
    //   } 
    // );    
    //      }
  }
}
