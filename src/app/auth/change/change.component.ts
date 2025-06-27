import { Component, effect, Renderer2 } from '@angular/core'; 
import { Router } from '@angular/router'; 

import { AbstractControl, FormControl,FormGroup,ValidationErrors,ValidatorFn,Validators} from "@angular/forms";

import { Subject  } from 'rxjs'; 
import { passwordStrengthValidator } from '@Shared/components/password/password.validator';
import { AuthService } from 'src/app/core/services/auth.service';
 

@Component({
  selector: 'app-change',
  standalone: false,
  templateUrl: './change.component.html' 
})
export class ChangeComponent { 
  
  destroy$ = new Subject();
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 
 

  protected form = new FormGroup({
        password: new FormControl("aaA1!aaaa",  [Validators.required, passwordStrengthValidator()]),
        confirmPassword: new FormControl("aaA1!aaaa",  [Validators.required]),
      },
      {
        validators: [this.matchPasswordsValidator()]
      }
 );

  constructor(   
     private renderer: Renderer2, 
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

 

  ngOnInit(){
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }

  matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value; 
      return password === confirm ? null : { notMatching: true };
    };
  }  
   
  change():void{ 

   
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
 
      const body = {
        password: this.form.value.password ?? "",
        passwordchange: this.form.value.confirmPassword ?? "",
      };

      console.log("[send]", body)
      this._authService.change(body) 
 
  }


  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
