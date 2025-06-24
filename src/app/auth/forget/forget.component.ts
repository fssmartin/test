import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router } from '@angular/router'; 

import { FormControl,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";

import { Subject, take, takeUntil, tap } from 'rxjs';
import { UserData } from '../../core/interfaces/user.dto';
import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service';
import { passwordStrengthValidator } from '@Shared/components/password/password.validator';
 

@Component({
  selector: 'app-forget',
  standalone: false,
  templateUrl: './forget.component.html' 
})
export class ForgetComponent { 
  
  destroy$ = new Subject();
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 
 

  protected form = new FormGroup({
      email: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      ])
  });

  constructor(private router: Router, 
    private _authService: AuthService,
    private _globalService:GlobalService, 
    private renderer: Renderer2, ){  
 
  }


  // protected isInvalid(controlName: string): boolean | undefined {
  //   const control = this.form.get(controlName);
  //   if (!control) return undefined;
  //   if (control.pristine) return undefined;
  //   return control.invalid;
  // }

  ngOnInit(){
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }
   
  reset():void{ 

      //const email = (document.getElementById('emailForm') as HTMLInputElement); 

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      this.loading = true; 

      const body = {
        email: this.form.value.email ?? ""
      };
/*
      if(email.value.trim() === "") {
          this.isError = true; 
          this.loading = false; 
      }else{
*/         
          this.isError = false;  
          this._authService.reset$(body)
          .subscribe({
              next: (data) => {
                 console.log("data",data)
              },
              error: (error) => console.log("error")
          })
/*
          this._authService.reset$(email.value.trim())
          .subscribe(
            (response: any) => {   
              this.loading = false;
              
               console.log("response__",response)
               
              this.router.navigate(['/home']);     
            } 
          ); 
  */
          this.router.navigate(['/home']);     

//      }
  }


  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
