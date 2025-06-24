import { Component} from '@angular/core'; 
import { FormControl,FormGroup,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 
 
import { passwordStrengthValidator } from '../../shared/components/password/password.validator';


@Component({
  selector: 'app-register',
    standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {  

  protected form = new FormGroup({
      email: new FormControl("asd@asd.es", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      ]),
      password: new FormControl("aaA1!aaaa",  [Validators.required, passwordStrengthValidator()]
      ),
      passwordnext: new FormControl("aaA1!aaaa",  [Validators.required, passwordStrengthValidator()]
      ),
      termsAccepted : new FormControl("true",  [Validators.required]
      ),
  });

  constructor(){    
  }


  

  ngAfterViewInit() { 
  }

  
  passwordShowhide(input: any, eye:string):void {
    var eyeButton = document.querySelector(eye);
    eyeButton!.classList.toggle('fa-eye-slash');     
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
