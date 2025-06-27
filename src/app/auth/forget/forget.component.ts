import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router } from '@angular/router'; 

import { FormControl,FormGroup,Validators} from "@angular/forms";

import { Subject } from 'rxjs'; 
import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service'; 
 

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
          
          this.isError = false;  
          this._authService.reset$(body)
          .subscribe({
              next: (data) => {
                 console.log("data",data)
                 this.router.navigate(['/home']);     
              },
              error: (error) => console.log("error")
          })
 


/* TEXTO DEL CORREO QUE LE LLEGARA...
    Estimado ASD@ASD.ES,
    Has solicitado restablecer tu contraseña, para restablecer tu contraseña haz click en el botón que se encuentra en la parte inferior.
    El enlace para recuperar la contraseña tendrá una validez de 24 horas, si no has solicitado cambiar la contraseña, ignora este mensaje.
*/

 
  }

  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }
}

