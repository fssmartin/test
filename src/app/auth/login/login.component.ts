import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { FormBuilder, FormControl,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 
import { Subject, take, takeUntil, tap } from 'rxjs';

import { LoginDto } from '../../core/interfaces/user.dto';

//import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service';

import { passwordStrengthValidator } from '../../shared/components/password/password.validator';


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

  password = signal('');
  passwordValid = computed(() => this.form.controls['password'].valid);
 
  form: FormGroup;
  
  constructor(
    private router: Router, 
    private _authService: AuthService,
    private renderer: Renderer2, 
    private fb: FormBuilder
    //private _globalService:GlobalService, 
  ){  

   this.form = this.fb.group({
        email: new FormControl("asd@asd.es", [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        ]), 
        password: new FormControl('aa!A1aaaaa', [Validators.required, passwordStrengthValidator()]),
    });

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
 
  ngOnInit(){
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }
  

  login():void{  

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      
      const body: LoginDto = {
        email: this.form.value.email ?? "",
        password: this.form.value.password ?? "",
      };

      console.log("body", body)

      this.loading = true; 
 
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
