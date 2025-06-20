import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { FormControl,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 
import { Subject, take, takeUntil, tap } from 'rxjs';

import { LoginDto } from '../../core/interfaces/user.dto';

//import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html' 
})
export class LoginComponent { 
  
  destroy$ = new Subject();
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 
 

  protected form = new FormGroup({
      email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
  });

  constructor(
    private router: Router, 
    private _authService: AuthService,
    private renderer: Renderer2, 
    //private _globalService:GlobalService, 
  ){  

    this.disabled = ''; 

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

  protected isInvalid(controlName: string): boolean | undefined {
    const control = this.form.get(controlName);
    if (!control) return undefined;
    if (control.pristine) return undefined;
    return control.invalid;
  }

  


  ngOnInit(){
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }
   
  
  passwordShowhide(input: any, eye:string):void {
    var eyeButton = document.querySelector(eye);
    eyeButton!.classList.toggle('fa-eye-slash');     
    input.type = input.type === 'password' ? 'text' : 'password';
  }
 

  login():void{ 

      //const email = (document.getElementById('emailForm') as HTMLInputElement);
      //const clave = (document.getElementById('password') as HTMLInputElement);

      
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      
      const body: LoginDto = {
        email: this.form.value.email ?? "",
        password: this.form.value.password ?? "",
      };

      this.loading = true; 

//      if ( (email.value.trim() === "") || (clave.value.trim() === "")   ) {
//          this.isError = true; 
//          this.loading = false; 
//      }else{ 

          this.isError = false;  
          this._authService.login(body)

          // .subscribe(
          //   (response: any) => {   
          //     this.loading = false;
          //      console.log("response__",response)
          //     this.router.navigate(['/home']);     
          //   } 
          // );   

//      }
  
  }

  protected onReset(): void {
    this.form.reset();
  }
  
  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
